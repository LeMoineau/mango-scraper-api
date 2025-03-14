import ScraperParsingError from "../../errors/ScraperParsingError";
import { ArrayUtils } from "./../../../../shared/src/utils/array-utils";
import Scraper from "../scraper";
import { MangaplusUtils } from "./utils/mangaplus-utils";
import cacheStorageService from "../../services/CacheStorage.service";
import { CacheKeys } from "../../config/cache-keys";
import axios from "axios";
import {
  PagedScrapedChapter,
  ScrapedChapter,
  SourcelessChapter,
} from "../../../../shared/src/types/basics/Chapter";
import { Manga, ScrapedManga } from "../../../../shared/src/types/basics/Manga";
import { ChapterPage } from "../../../../shared/src/types/basics/ChapterPage";
import {
  ChapterEndpoint,
  Lang,
  MangaEndpoint,
} from "../../../../shared/src/types/primitives/Identifiers";
import { ResponsePage } from "../../../../shared/src/types/responses/ResponsePage";
import { JsonObject } from "../../../../shared/src/types/primitives/jsonObject";
import { mangaplusMangaTranslation } from "./types/mangaplusMangaTranslation";

class MangaPlusScraper implements Scraper {
  private SCRAPER_SOURCE_NAME = "mangaplus";
  private API_ENDPOINT =
    process.env.MANGAPLUS_API_ENDPOINT ??
    "https://jumpg-webapi.tokyo-cdn.com/api";

  private _generateChapterUrl(endpoint: ChapterEndpoint): string {
    return `https://mangaplus.shueisha.co.jp/viewer/${endpoint}`;
  }

  private _generateMangaUrl(endpoint: MangaEndpoint): string {
    return `https://mangaplus.shueisha.co.jp/titles/${endpoint}`;
  }

  /**
   * Get the list of the latest chapters from mangaplus api
   * @returns a list of the latest chapters
   */
  public async getLatestChapters(): Promise<ScrapedChapter[]> {
    const jsonRes = await MangaplusUtils.decodeJsonFromMangaPlusRequest(
      `${this.API_ENDPOINT}/web/web_homeV4?lang=eng&clang=`,
      `${__dirname}/protos/web_homeV4.proto`,
      "mangaplus.Web_homeV4"
    );
    const chapters: ScrapedChapter[] = [];
    const currentDate: Date = new Date();
    try {
      for (let card of jsonRes.parent.data.sections[0].cards) {
        for (let chapter of card.chapters) {
          chapters.push({
            src: this.SCRAPER_SOURCE_NAME,
            endpoint: chapter.id.toString(),
            url: this._generateChapterUrl(chapter.id.toString()),
            title: chapter.title,
            number: ArrayUtils.tryingSplitAndGet(chapter.chapter, "#", 1),
            image: chapter.manga.portraitThumbnail,
            releaseDate: currentDate,
            lang: MangaplusUtils.convertMangaplusLangToCommonLang(
              chapter.manga.mangaLanguage
            ),
            manga: {
              title: chapter.manga.title,
              endpoint: chapter.manga.id.toString(),
              url: this._generateMangaUrl(chapter.manga.id.toString()),
            },
          });
        }
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
      for (let manga of jsonRes.parent.data.mangas) {
        allMangas.push(
          ...manga.translations.map((t: mangaplusMangaTranslation) => ({
            src: this.SCRAPER_SOURCE_NAME,
            endpoint: t.id.toString(),
            url: this._generateMangaUrl(t.id.toString()),
            title: t.title,
            lang: MangaplusUtils.convertMangaplusLangToCommonLang(t.language),
            author: t.author,
            image: t.portraitThumbnail,
          }))
        );
      }
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

  private _findMangaplusLanguageFromTitleDetailJson(jsonRes: JsonObject): Lang {
    return MangaplusUtils.convertMangaplusLangToCommonLang(
      jsonRes.parent.data.languages.find(
        (l: any) => l.mangaId === jsonRes.parent.data.manga.id
      )?.language
    );
  }

  private _generateMangaChapters(jsonRes: JsonObject): SourcelessChapter[] {
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
                url: this._generateChapterUrl(item.chapterId),
                number: item.chapter,
                title: item.title,
                lang: this._findMangaplusLanguageFromTitleDetailJson(jsonRes),
                image: item.thumbnail,
                releaseDate: new Date(item.releaseDate * 1000),
              })
            )
          );
    }
    return chapters;
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
    return {
      endpoint,
      src: this.SCRAPER_SOURCE_NAME,
      url: this._generateMangaUrl(endpoint),
      title: jsonRes.parent.data.manga.title,
      author: jsonRes.parent.data.manga.author,
      image: jsonRes.parent.data.manga.portraitThumbnail,
      lang: this._findMangaplusLanguageFromTitleDetailJson(jsonRes),
      chapters: this._generateMangaChapters(jsonRes),
    };
  }

  public async getMangaChapters(
    endpoint: string,
    props: {
      pageNumber: number;
      pageSize?: number;
    }
  ): Promise<ResponsePage<SourcelessChapter>> {
    if (props.pageNumber > 1) {
      return {
        elements: [],
        pageNumber: props.pageNumber,
        pageSize: props.pageSize ?? 0,
      };
    }
    const jsonRes = await MangaplusUtils.decodeJsonFromMangaPlusRequest(
      `${this.API_ENDPOINT}/title_detailV3?title_id=${endpoint}`,
      `${__dirname}/protos/title_detailV3.proto`,
      "mangaplus.Title_detailV3"
    );
    const chapters = this._generateMangaChapters(jsonRes);
    return {
      elements: chapters,
      pageNumber: props.pageNumber,
      pageSize: chapters.length,
    };
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
        src: this.SCRAPER_SOURCE_NAME,
        endpoint: chapterId,
        url: this._generateChapterUrl(chapterId),
        title: `${jsonRes.parent.data.titleName} - ${jsonRes.parent.data.chapterName}`,
        number: jsonRes.parent.data.chapterName,
        lang: MangaplusUtils.convertMangaplusLangToCommonLang(
          jsonRes.parent.data.languages.find(
            (l: any) => l.mangaId === jsonRes.parent.data.titleId
          )?.language
        ),
        pages: pages,
        manga: {
          endpoint: jsonRes.parent.data.titleId,
          url: this._generateMangaUrl(jsonRes.parent.data.titleId),
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
