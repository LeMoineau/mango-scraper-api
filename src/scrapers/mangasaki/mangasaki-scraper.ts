import Scraper from "../scraper";
import { ScrapingUtils } from "../../utils/scraping-utils";
import { ArrayUtils } from "./../../../../shared/src/utils/array-utils";
import { MangasakiUtils } from "./utils/mangasaki-utils";
import { TextFormatUtils } from "./../../../../shared/src/utils/text-format-utils";
import { CheerioAPI } from "cheerio";
import DefaultPageLoader from "../defaults/default-page-loader";
import {
  PagedScrapedChapter,
  ScrapedChapter,
  SourcelessChapter,
} from "../../../../shared/src/types/basics/Chapter";
import { Manga, ScrapedManga } from "../../../../shared/src/types/basics/Manga";
import {
  ChapterEndpoint,
  MangaEndpoint,
} from "../../../../shared/src/types/primitives/Identifiers";
import { ResponsePage } from "../../../../shared/src/types/responses/ResponsePage";

class MangaSakiScraper extends DefaultPageLoader implements Scraper {
  private PAGE_URL = process.env.MANGASAKI_URL ?? "https://www.mangasaki.org";

  private _generateChapterUrl(endpoint: ChapterEndpoint): string {
    return TextFormatUtils.isNumber(endpoint)
      ? `${this.PAGE_URL}/node/${endpoint}`
      : `${this.PAGE_URL}/chapter/${endpoint}`;
  }

  private _generateMangaUrl(endpoint: MangaEndpoint): string {
    return TextFormatUtils.isNumber(endpoint)
      ? `${this.PAGE_URL}/node/${endpoint}`
      : `${this.PAGE_URL}/manga/${endpoint}`;
  }

  public async getLatestChapters(): Promise<ScrapedChapter[]> {
    const $ = await ScrapingUtils.requestToCheerioPage(
      `${this.PAGE_URL}/block_refresh/showmanga/lastest_list`
    );
    const chapters: ScrapedChapter[] = [];
    $("ul#latest-list > li").each((i) => {
      const currentMangaPath = `ul#latest-list > li:nth-child(${i + 1})`;
      $(`${currentMangaPath} .item-list ul li .item-list ul li`).each((j) => {
        const currentChapterPath = `${currentMangaPath} .item-list ul li .item-list ul li:nth-child(${
          j + 1
        })`;
        try {
          const imageURL = $(`${currentMangaPath} a:first-child img`).attr(
            "src"
          )!;
          const chapterEndpoint = ArrayUtils.getLastOf(
            $(`${currentChapterPath} a`).attr("href")!.split("/")
          );
          const mangaTitle = $(
            `${currentMangaPath} .item-list ul li .tl a strong`
          ).text();
          const mangaEndpoint = ArrayUtils.getLastOf(
            $(`${currentMangaPath} .item-list ul li .tl a`)
              .attr("href")!
              .split("/")
          );
          chapters.push({
            src: "mangasaki",
            endpoint: chapterEndpoint,
            url: this._generateChapterUrl(chapterEndpoint),
            title: $(`${currentChapterPath} a`).text(),
            number: MangasakiUtils.formatChapterNumber(
              $(`${currentChapterPath} a`).text(),
              mangaTitle
            ),
            manga: {
              title: mangaTitle,
              endpoint: mangaEndpoint,
              url: this._generateMangaUrl(mangaEndpoint),
            },
            image: imageURL.split("minicover").join("bigcover"),
            releaseDate: MangasakiUtils.calculateDateFromString(
              $(`${currentChapterPath} .tm`).text()
            ),
          });
        } catch (e) {}
      });
    });
    return chapters;
  }

  public async searchMangas({
    q,
  }: {
    q?: string | undefined;
  }): Promise<Manga[]> {
    const $ = await ScrapingUtils.requestToCheerioPage(
      `${this.PAGE_URL}/search/node/${q}`
    );
    let mangas: Manga[] = [];
    $(".search-results li").each((i) => {
      const targetSearch = `.search-results li:nth-child(${i + 1}) a`;
      const mangaEndpoint = ArrayUtils.getLastOf(
        $(targetSearch).attr("href")!.split("/")
      );
      mangas.push({
        endpoint: mangaEndpoint,
        title: $(targetSearch).text(),
        src: "mangasaki",
        url: this._generateMangaUrl(mangaEndpoint),
      });
    });
    return mangas;
  }

  private _generateMangaChapters($: CheerioAPI): SourcelessChapter[] {
    const mangaTitle = $("div#main .title").text().trim();
    let chapters: SourcelessChapter[] = [];
    $("div#main .node-manga table tbody tr").each((i) => {
      const currentChapterPath = `div#main .node-manga table tbody tr:nth-child(${
        i + 1
      })`;
      const chapterEndpoint = ArrayUtils.getLastOf(
        $(`${currentChapterPath} a`).attr("href")!.split("/")
      );
      chapters.push({
        endpoint: chapterEndpoint,
        url: this._generateChapterUrl(chapterEndpoint),
        number: MangasakiUtils.formatChapterNumber(
          $(`${currentChapterPath} a`).text(),
          mangaTitle
        ),
        title: $(`${currentChapterPath} a`).text(),
        releaseDate: new Date(
          $(`${currentChapterPath} td:nth-child(2)`).text()
        ),
      });
    });
    return chapters;
  }

  public async getManga(
    endpoint: MangaEndpoint
  ): Promise<ScrapedManga | undefined> {
    try {
      const $ = await ScrapingUtils.requestToCheerioPage(
        this._generateMangaUrl(endpoint)
      );
      const mangaTitle = $("div#main .title").text();
      return {
        src: "mangasaki",
        endpoint,
        url: this._generateMangaUrl(endpoint),
        title: mangaTitle,
        author: $(
          ".node-manga .content .field:nth-child(4) .field-item"
        ).text(),
        image: $(".node-manga .content .field:nth-child(1) img").attr("src")!,
        chapters: this._generateMangaChapters($),
      };
    } catch (error) {
      console.error(error);
      return;
    }
  }

  public async getMangaChapters(
    endpoint: string,
    props: { pageNumber: number; pageSize?: number }
  ): Promise<ResponsePage<SourcelessChapter>> {
    const $ = await ScrapingUtils.requestToCheerioPage(
      `${this._generateMangaUrl(endpoint)}?page=${props.pageNumber - 1}`
    );
    const chapters = this._generateMangaChapters($);
    return {
      elements: chapters,
      pageNumber: props.pageNumber,
      pageSize: chapters.length,
    };
  }

  public async getChapter(
    endpoint: ChapterEndpoint
  ): Promise<PagedScrapedChapter | undefined> {
    try {
      const $ = await ScrapingUtils.requestToCheerioPage(
        this._generateChapterUrl(endpoint)
      );
      let pages: string[] = $.html()
        .split(`,"showmanga":{"paths":["`)[1]
        .split(`"],"count_p":`)[0]
        .split('","');
      pages.splice(1, 1);
      const title = $("h1.title").text().split("|")[0].trim();
      const number = ArrayUtils.getLastOf(title.split(" "));
      const mangaEndpoint = ArrayUtils.getLastOf(
        $("h1.title a").attr("href")!.split("/")
      );
      return {
        endpoint,
        url: this._generateChapterUrl(endpoint),
        title,
        number,
        src: "mangasaki",
        pages: pages.map((p) => {
          return { url: p };
        }),
        manga: {
          endpoint: mangaEndpoint,
          url: this._generateChapterUrl(mangaEndpoint),
          title: TextFormatUtils.stringWithout(title, number).trim(),
        },
      };
    } catch (err) {
      console.error(err);
      return;
    }
  }
}

export default new MangaSakiScraper();
