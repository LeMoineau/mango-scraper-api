import Chapter from "../../types/chapter";
import Manga from "../../types/manga";
import Scraper from "../scraper";
import { ScrapingUtils } from "../../utils/scraping-utils";
import { ArrayUtils } from "../../utils/array-utils";
import { MangasakiUtils } from "./utils/mangasaki-utils";
import ChapterViewer from "../../types/chapterViewer";

class MangaSakiScraper implements Scraper {
  private PAGE_URL =
    process.env.MANGASAKI_URL ??
    "https://www.mangasaki.org/block_refresh/showmanga/lastest_list";

  async getLatestChapters(): Promise<Chapter[]> {
    const $ = await ScrapingUtils.requestToCheerioPage(this.PAGE_URL);
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
  async getManga({}): Promise<Manga> {
    throw Error("not yet implemented");
  }
  public async getChapterPages(chapterId: string): Promise<ChapterViewer> {
    return {} as ChapterViewer;
  }
}

export default new MangaSakiScraper();
