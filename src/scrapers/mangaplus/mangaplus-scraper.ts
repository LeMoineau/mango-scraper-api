import ScraperParsingError from "../../errors/ScraperParsingError";
import { ArrayUtils } from "./../../../../shared/src/utils/array-utils";
import { TextFormatUtils } from "./../../../../shared/src/utils/text-format-utils";
import Scraper from "../scraper";
import { MangaPlusCard } from "./types/mangaplusCard";
import { MangaplusUtils } from "./utils/mangaplus-utils";
import { MangaPlusManga } from "./types/mangaplusManga";
import cacheStorageService from "../../services/CacheStorage.service";
import { CacheKeys } from "../../config/cache-keys";
import axios from "axios";
import {
  Chapter,
  PagedScrapedChapter,
  ScrapedChapter,
  SourcelessChapter,
} from "../../../../shared/src/types/basics/Chapter";
import { Manga, ScrapedManga } from "../../../../shared/src/types/basics/Manga";
import { ChapterPage } from "../../../../shared/src/types/basics/ChapterPage";
import {
  ChapterEndpoint,
  MangaEndpoint,
} from "../../../../shared/src/types/primitives/Identifiers";

class MangaPlusScraper implements Scraper {
  private API_ENDPOINT =
    process.env.MANGAPLUS_API_ENDPOINT ??
    "https://jumpg-webapi.tokyo-cdn.com/api";

  private generateChapterUrl(endpoint: ChapterEndpoint): string {
    return `https://mangaplus.shueisha.co.jp/viewer/${endpoint}`;
  }

  private generateMangaUrl(endpoint: MangaEndpoint): string {
    return `https://mangaplus.shueisha.co.jp/titles/${endpoint}`;
  }

  /**
   * Get the list of the latest chapters from mangaplus api
   * @returns a list of the latest chapters
   */
  public async getLatestChapters(): Promise<ScrapedChapter[]> {
    const jsonRes = await MangaplusUtils.decodeJsonFromMangaPlusRequest(
      `${this.API_ENDPOINT}/web/web_homeV3?lang=eng`,
      `${__dirname}/protos/web_homeV3.proto`,
      "mangaplus.Web_homeV3"
    );
    const chapters: ScrapedChapter[] = [];
    const currentDate: Date = new Date();
    try {
      for (let s of jsonRes.parent.data.sections) {
        chapters.push(
          ...s.cards.map(
            (c: MangaPlusCard): ScrapedChapter => ({
              src: "mangaplus",
              endpoint: c.chapter.id.toString(),
              url: this.generateChapterUrl(c.chapter.id.toString()),
              title: c.chapter.title,
              number: ArrayUtils.tryingSplitAndGet(c.chapter.chapter, "#", 1),
              image: c.chapter.manga.portraitThumbnail,
              releaseDate: currentDate,
              manga: {
                title: c.mangaTitle,
                endpoint: c.chapter.manga.id.toString(),
                url: this.generateMangaUrl(c.chapter.manga.id.toString()),
              },
            })
          )
        );
        currentDate.setDate(currentDate.getDate() - 1);
      }
    } catch (error) {
      console.error(error);
      throw new ScraperParsingError(
        "json recieved from manga plus api not have the expected format"
      );
    }
    return chapters;
  }

  /**
   * Get all mangas from an user search
   * @returns a list of all mangas which correspond to user search
   */
  public async searchMangas({ q }: { q?: string }): Promise<Manga[]> {
    let allMangas: Manga[] = [];
    if (!cacheStorageService.isCached(CacheKeys.MANGAPLUS_ALL_MANGAS)) {
      const jsonRes = await MangaplusUtils.decodeJsonFromMangaPlusRequest(
        `${this.API_ENDPOINT}/title_list/allV2`,
        `${__dirname}/protos/allV2.proto`,
        "mangaplus.AllV2"
      );
      allMangas = jsonRes.parent.data.mangas.map(
        (m: {
          title: string;
          translations: Omit<MangaPlusManga, "views">[];
        }): Manga => ({
          src: "mangaplus",
          endpoint: m.translations[0].id.toString(),
          url: this.generateMangaUrl(m.translations[0].id.toString()),
          title: m.title,
          author: m.translations[0].author,
          image: m.translations[0].portraitThumbnail,
        })
      );
      cacheStorageService.saveInCache(
        CacheKeys.MANGAPLUS_ALL_MANGAS,
        allMangas,
        15 * 24 * 60 * 60 * 1000
      );
    } else {
      allMangas = cacheStorageService.loadFromCache<Manga[]>(
        CacheKeys.MANGAPLUS_ALL_MANGAS
      )!;
    }
    let mangasFound: Manga[] = [];
    if (q) {
      mangasFound = allMangas.filter((m: Manga) => {
        return (
          m.title.toLowerCase().includes(q.toLowerCase()) ||
          q.toLowerCase().includes(m.title.toLowerCase())
        );
      });
    }
    return mangasFound;
  }

  /**
   * Get all informations about a manga including its chapters
   * @param id mangaplus manga id
   * @returns targeted manga informations including chapters
   */
  public async getManga(
    endpoint: MangaEndpoint
  ): Promise<ScrapedManga | undefined> {
    const jsonRes = await MangaplusUtils.decodeJsonFromMangaPlusRequest(
      `${this.API_ENDPOINT}/title_detailV3?title_id=${endpoint}`,
      `${__dirname}/protos/title_detailV3.proto`,
      "mangaplus.Title_detailV3"
    );
    try {
      let chapters: SourcelessChapter[] = [];
      for (let c of jsonRes.parent.data.chapters) {
        for (let label of [
          "freeInitialChapters",
          "appExclusiveChapters",
          "freeLatestChapters",
        ])
          if (c[label])
            chapters.push(
              ...ArrayUtils.transformEachItemOf(
                c[label],
                (item: any): SourcelessChapter => ({
                  endpoint: `${item.chapterId}`,
                  url: this.generateChapterUrl(item.chapterId),
                  number: item.chapter,
                  title: item.title,
                  image: item.thumbnail,
                  releaseDate: new Date(item.releaseDate * 1000),
                })
              )
            );
      }
      return {
        endpoint,
        src: "mangaplus",
        url: this.generateMangaUrl(endpoint),
        title: jsonRes.parent.data.manga.title,
        author: jsonRes.parent.data.manga.author,
        image: jsonRes.parent.data.manga.portraitThumbnail,
        chapters: chapters,
      };
    } catch (error) {
      console.error(error);
      return;
    }
  }

  /**
   * Get the chapter viewer including all its pages
   * @param mangaId mangaplus manga id
   * @param chapterId mangaplus chapter id
   * @returns the chapter viewer of the chapter including all its pages
   */
  public async getChapter(
    chapterId: ChapterEndpoint
  ): Promise<PagedScrapedChapter | undefined> {
    const jsonRes = await MangaplusUtils.decodeJsonFromMangaPlusRequest(
      `${this.API_ENDPOINT}/manga_viewer?chapter_id=${chapterId}&split=yes&img_quality=high`,
      `${__dirname}/protos/manga_viewer.proto`,
      "mangaplus.Manga_viewer"
    );
    try {
      const pages = [
        ...ArrayUtils.transformEachItemOf(
          jsonRes.parent.data.pages,
          (item: any): ChapterPage | undefined => {
            if (!item || !item.image) return;
            return {
              url: item.image.url,
              decryptionKey: item.image.decryptionKey,
            };
          }
        ),
      ];
      return {
        src: "mangaplus",
        endpoint: chapterId,
        url: this.generateChapterUrl(chapterId),
        title: `${jsonRes.parent.data.titleName} - ${jsonRes.parent.data.chapterName}`,
        number: jsonRes.parent.data.chapterName,
        pages: pages,
        manga: {
          endpoint: jsonRes.parent.data.titleId,
          url: this.generateMangaUrl(jsonRes.parent.data.titleId),
          title: jsonRes.parent.data.titleName,
        },
      };
    } catch (error) {
      console.error(error);
      return;
    }
  }

  public async generatePage(
    chapterPage: ChapterPage
  ): Promise<Buffer | undefined> {
    try {
      const res = await axios.get(new URL(chapterPage.url).href, {
        responseType: "arraybuffer",
      });
      if (!chapterPage.decryptionKey) {
        return res.data;
      }
      return MangaplusUtils.decodeImageMangaPlus(
        res.data,
        chapterPage.decryptionKey
      );
    } catch (err) {
      console.error(err);
      return;
    }
  }
}

export default new MangaPlusScraper();
