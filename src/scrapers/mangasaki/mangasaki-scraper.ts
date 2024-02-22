import Chapter, { ChapterInfos } from "../../types/chapter";
import Manga from "../../types/manga";
import Scraper from "../scraper";
import { ScrapingUtils } from "../../utils/scraping-utils";
import { ArrayUtils } from "../../utils/array-utils";
import { MangasakiUtils } from "./utils/mangasaki-utils";
import ChapterViewer from "../../types/chapterViewer";
import { TextFormatUtils } from "../../utils/text-format-utils";
import { CheerioAPI } from "cheerio";

class MangaSakiScraper implements Scraper {
  private PAGE_URL = process.env.MANGASAKI_URL ?? "https://www.mangasaki.org";

  async getLatestChapters(): Promise<Chapter[]> {
    const $ = await ScrapingUtils.requestToCheerioPage(
      `${this.PAGE_URL}/block_refresh/showmanga/lastest_list`
    );
    const chapters: Chapter[] = [];
    $("ul#latest-list > li").each((i) => {
      const currentMangaPath = `ul#latest-list > li:nth-child(${i + 1})`;
      $(`${currentMangaPath} .item-list ul li .item-list ul li`).each((j) => {
        const currentChapterPath = `${currentMangaPath} .item-list ul li .item-list ul li:nth-child(${
          j + 1
        })`;
        try {
          chapters.push({
            image: $(`${currentMangaPath} a:first-child img`).attr("src")!,
            manga: {
              title: $(
                `${currentMangaPath} .item-list ul li .tl a strong`
              ).text(),
              id: ArrayUtils.getLastOf(
                $(`${currentMangaPath} .item-list ul li .tl a`)
                  .attr("href")!
                  .split("/")
              ),
            },
            number: ArrayUtils.getLastOf(
              $(`${currentChapterPath} a`).text().split(" ")
            ),
            title: $(`${currentChapterPath} a`).text(),
            id: ArrayUtils.getLastOf(
              $(`${currentChapterPath} a`).attr("href")!.split("/")
            ),
            releaseDate: MangasakiUtils.calculateDateFromString(
              $(`${currentChapterPath} .tm`).text()
            ),
          });
        } catch (e) {}
      });
    });
    return chapters;
  }

  async getMangas({ q }: { q?: string | undefined }): Promise<Manga[]> {
    return [];
    throw Error("not yet implemented");
  }

  async getManga(id: string): Promise<Manga> {
    let $: CheerioAPI;
    if (TextFormatUtils.isNumber(id)) {
      $ = await ScrapingUtils.requestToCheerioPage(
        `${this.PAGE_URL}/node/${id}`
      );
    } else {
      $ = await ScrapingUtils.requestToCheerioPage(
        `${this.PAGE_URL}/manga/${id}`
      );
    }
    const mangaTitle = $("div#main .title").text();
    let chapters: ChapterInfos[] = [];
    $("div#main .node-manga table tbody tr").each((i) => {
      const currentChapterPath = `div#main .node-manga table tbody tr:nth-child(${
        i + 1
      })`;
      chapters.push({
        id: $(`${currentChapterPath} a`).attr("href")!,
        number: TextFormatUtils.stringWithout(
          $(`${currentChapterPath} a`).text(),
          mangaTitle
        ),
        title: $(`${currentChapterPath} a`).text(),
        releaseDate: new Date(
          $(`${currentChapterPath} td:nth-child(2)`).text()
        ),
      });
    });
    return {
      id: id,
      name: mangaTitle,
      author: $(".node-manga .content .field:nth-child(4) .field-item").text(),
      image: $(".node-manga .content .field:nth-child(1) img").attr("src")!,
      chapters,
    };
  }

  public async getChapterPages(
    mangaId: string,
    chapterId: string
  ): Promise<ChapterViewer> {
    return {} as ChapterViewer;
  }
}

export default new MangaSakiScraper();
