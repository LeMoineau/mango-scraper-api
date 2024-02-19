import scrapersConfig from "../config/scrapers-config";
import { ScraperName } from "../config/scrapersConfig";
import ChapterViewer from "../types/chapterViewer";
import { IntersiteManga } from "../types/intersite/IntersiteManga";
import Manga from "../types/manga";
import scraperController from "./scraper-controller";

class MangasController {
  public constructor() {}

  public async getAll({
    query,
  }: {
    query?: string;
  }): Promise<IntersiteManga[]> {
    return [];
  }

  public async get({
    name,
    id,
    src,
  }: {
    name?: string;
    id?: string;
    src?: ScraperName;
  }): Promise<IntersiteManga | Manga> {
    if (name) {
    } else if (id && src) {
      return await scrapersConfig.scrapers[src].scraper.getManga(id);
    }
    return {} as IntersiteManga;
  }

  public async getChapterPages(
    src: string,
    mangaId: string,
    chapterId: string
  ): Promise<ChapterViewer> {
    return await scrapersConfig.scrapers[src].scraper.getChapterPages(
      mangaId,
      chapterId
    );
  }
}

export default new MangasController();
