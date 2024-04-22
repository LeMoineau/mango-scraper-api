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
} from "../../../../shared/src/types/Chapter";
import { Manga, ScrapedManga } from "../../../../shared/src/types/Manga";
import {
  ChapterEndpoint,
  MangaEndpoint,
} from "../../../../shared/src/types/primitives/Identifiers";

class MangaSakiScraper extends DefaultPageLoader implements Scraper {
  private PAGE_URL = process.env.MANGASAKI_URL ?? "https://www.mangasaki.org";

  async getLatestChapters(): Promise<ScrapedChapter[]> {
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

          chapters.push({
            src: "mangasaki",
            endpoint: ArrayUtils.getLastOf(
              $(`${currentChapterPath} a`).attr("href")!.split("/")
            ),
            title: $(`${currentChapterPath} a`).text(),
            number: ArrayUtils.getLastOf(
              $(`${currentChapterPath} a`).text().split(" ")
            ),
            manga: {
              title: $(
                `${currentMangaPath} .item-list ul li .tl a strong`
              ).text(),
              endpoint: ArrayUtils.getLastOf(
                $(`${currentMangaPath} .item-list ul li .tl a`)
                  .attr("href")!
                  .split("/")
              ),
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

  async searchMangas({ q }: { q?: string | undefined }): Promise<Manga[]> {
    const $ = await ScrapingUtils.requestToCheerioPage(
      `${this.PAGE_URL}/search/node/${q}`
    );
    let mangas: Manga[] = [];
    $(".search-results li").each((i) => {
      const targetSearch = `.search-results li:nth-child(${i + 1}) a`;
      mangas.push({
        endpoint: ArrayUtils.getLastOf(
          $(targetSearch).attr("href")!.split("/")
        ),
        title: $(targetSearch).text(),
        src: "mangasaki",
      });
    });
    return mangas;
  }

  async getManga(endpoint: MangaEndpoint): Promise<ScrapedManga | undefined> {
    try {
      let $: CheerioAPI;
      if (TextFormatUtils.isNumber(endpoint)) {
        $ = await ScrapingUtils.requestToCheerioPage(
          `${this.PAGE_URL}/node/${endpoint}`
        );
      } else {
        $ = await ScrapingUtils.requestToCheerioPage(
          `${this.PAGE_URL}/manga/${endpoint}`
        );
      }
      const mangaTitle = $("div#main .title").text();
      let chapters: SourcelessChapter[] = [];
      $("div#main .node-manga table tbody tr").each((i) => {
        const currentChapterPath = `div#main .node-manga table tbody tr:nth-child(${
          i + 1
        })`;
        const chapterNumber = TextFormatUtils.stringWithout(
          $(`${currentChapterPath} a`).text(),
          mangaTitle
        );
        chapters.push({
          endpoint: ArrayUtils.getLastOf(
            $(`${currentChapterPath} a`).attr("href")!.split("/")
          ),
          number: chapterNumber,
          title: $(`${currentChapterPath} a`).text(),
          releaseDate: new Date(
            $(`${currentChapterPath} td:nth-child(2)`).text()
          ),
        });
      });
      const urlFirstChapter = $(
        `div#main .node-manga table tbody tr:nth-child(1) a`
      ).attr("href");
      if (urlFirstChapter) {
        const $2 = await ScrapingUtils.requestToCheerioPage(
          `${this.PAGE_URL}/${urlFirstChapter}`
        );
        $2("select#edit-select-node option").each((i) => {
          const currentChapter = $2(
            `select#edit-select-node option:nth-child(${i + 1})`
          );
          const chapterNumber = TextFormatUtils.stringWithout(
            $(currentChapter).text(),
            mangaTitle
          );
          const sameChapter = chapters.find((c) => c.number === chapterNumber);
          if (!sameChapter) {
            chapters.push({
              endpoint: $(currentChapter).attr("value")!,
              number: chapterNumber,
              title: $(currentChapter).text(),
            });
          }
        });
      }
      return {
        src: "mangasaki",
        endpoint: endpoint,
        title: mangaTitle,
        author: $(
          ".node-manga .content .field:nth-child(4) .field-item"
        ).text(),
        image: $(".node-manga .content .field:nth-child(1) img").attr("src")!,
        chapters,
      };
    } catch (error) {
      console.error(error);
      return;
    }
  }

  public async getChapter(
    chapterId: ChapterEndpoint
  ): Promise<PagedScrapedChapter | undefined> {
    try {
      let $: CheerioAPI;
      if (TextFormatUtils.isNumber(chapterId)) {
        $ = await ScrapingUtils.requestToCheerioPage(
          `${this.PAGE_URL}/node/${chapterId}`
        );
      } else {
        $ = await ScrapingUtils.requestToCheerioPage(
          `${this.PAGE_URL}/chapter/${chapterId}`
        );
      }
      let pages: string[] = $.html()
        .split(`,"showmanga":{"paths":["`)[1]
        .split(`"],"count_p":`)[0]
        .split('","');
      pages.splice(1, 1);
      const title = $("h1.title").text().split("|")[0].trim();
      const number = ArrayUtils.getLastOf(title.split(" "));
      return {
        endpoint: chapterId,
        title,
        number,
        src: "mangasaki",
        pages: pages.map((p) => {
          return { url: p };
        }),
        manga: {
          endpoint: ArrayUtils.getLastOf(
            $("h1.title a").attr("href")!.split("/")
          ),
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
