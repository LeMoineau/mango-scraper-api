import Scraper from "../scraper";
import { ScrapingUtils } from "../../utils/scraping-utils";
import { ArrayUtils } from "../../../../shared/src/utils/array-utils";
import { MangasakiUtils } from "./utils/mangasaki-utils";
import { TextFormatUtils } from "../../../../shared/src/utils/text-format-utils";
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
import { CommonLangs } from "../../../../shared/src/config/enums/CommonLangs";
import ScraperParsingError from "../../errors/ScraperParsingError";

class SailMgScraper extends DefaultPageLoader implements Scraper {
  private SCRAPER_SOURCE_NAME = "sailmg";
  private PAGE_URL = process.env.SAILMG_URL ?? "https://www.sailmg.com";

  private _generateChapterUrl(endpoint: ChapterEndpoint): string {
    return `${this.PAGE_URL}/content/${endpoint}`;
  }

  private _generateMangaUrl(endpoint: MangaEndpoint): string {
    return `${this.PAGE_URL}/content/${endpoint}`;
  }

  public async getLatestChapters(): Promise<ScrapedChapter[]> {
    const $ = await ScrapingUtils.requestToCheerioPage(
      `${this.PAGE_URL}/block_refresh/showmanga/lastest_list`
    );
    const chapters: ScrapedChapter[] = [];
    $("ul#latest-list > li").each((i) => {
      const currentMangaPath = `ul#latest-list > li:nth-child(${i + 1})`;
      $(`${currentMangaPath} ul li ul li`).each((j) => {
        const currentChapterPath = `${currentMangaPath} ul li ul li:nth-child(${
          j + 1
        })`;
        const imageURL = $(`${currentMangaPath} a:first-child img`).attr(
          "src"
        )!;
        const chapterEndpoint = ArrayUtils.getLastOf(
          $(`${currentChapterPath} a`).attr("href")!.split("/")
        );
        const mangaTitle = $(`${currentMangaPath} ul li .tl a strong`).text();
        const mangaEndpoint = ArrayUtils.getLastOf(
          $(`${currentMangaPath} ul li .tl a`).attr("href")!.split("/")
        );
        chapters.push({
          src: this.SCRAPER_SOURCE_NAME,
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
          lang: CommonLangs.ENGLISH,
          image: imageURL.split("minicover").join("cover"),
          releaseDate: MangasakiUtils.calculateDateFromString(
            $(`${currentChapterPath} .tm`).text()
          ),
        });
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
        src: this.SCRAPER_SOURCE_NAME,
        lang: CommonLangs.ENGLISH,
        url: this._generateMangaUrl(mangaEndpoint),
      });
    });
    return mangas;
  }

  private _generateMangaChapters($: CheerioAPI): SourcelessChapter[] {
    const mangaTitle = $("h1.page-header").text().trim();
    let chapters: SourcelessChapter[] = [];
    $(".node-manga table tbody tr").each((i) => {
      const currentChapterPath = `.node-manga table tbody tr:nth-child(${
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
        lang: CommonLangs.ENGLISH,
      });
    });
    return chapters;
  }

  public async getManga(
    endpoint: MangaEndpoint
  ): Promise<ScrapedManga | undefined> {
    const $ = await ScrapingUtils.requestToCheerioPage(
      this._generateMangaUrl(endpoint)
    );
    const mangaTitle = $("h1.page-header").text();
    return {
      src: this.SCRAPER_SOURCE_NAME,
      endpoint,
      url: this._generateMangaUrl(endpoint),
      title: mangaTitle,
      lang: CommonLangs.ENGLISH,
      author: $(
        ".node-manga .content .field-name-field-author .field-item"
      ).text(),
      image: $(".node-manga .content .field-name-field-image2 img").attr(
        "src"
      )!,
      chapters: this._generateMangaChapters($),
    };
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
    const $ = await ScrapingUtils.requestToCheerioPage(
      this._generateChapterUrl(endpoint)
    );
    console.log(this._generateChapterUrl(endpoint));
    let pages: string[] = $.html()
      .split(`,"showmanga":{"paths":["`)[1]
      .split(`"],"count_p":`)[0]
      .split('","');
    pages.splice(1, 1);
    const title = $("#edit-select-node option[selected='selected']")
      .text()
      .trim();
    const number = ArrayUtils.getLastOf(title.split(" "));
    const mangaEndpointHref = $("h1.page-header a:not(.active)").attr("href");
    if (!mangaEndpointHref) {
      throw new ScraperParsingError("manga endpoint href not find");
    }
    const mangaEndpoint = ArrayUtils.getLastOf(mangaEndpointHref.split("/"));
    return {
      endpoint,
      url: this._generateChapterUrl(endpoint),
      title,
      number,
      src: this.SCRAPER_SOURCE_NAME,
      lang: CommonLangs.ENGLISH,
      pages: pages.map((p) => {
        return { url: p };
      }),
      manga: {
        endpoint: mangaEndpoint,
        url: this._generateChapterUrl(mangaEndpoint),
        title: TextFormatUtils.stringWithout(title, number).trim(),
      },
    };
  }
}

export default new SailMgScraper();
