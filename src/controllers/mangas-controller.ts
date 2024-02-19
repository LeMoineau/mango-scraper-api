import scrapersConfig from "../config/scrapers-config";
import { ScraperName } from "../config/scrapersConfig";
import ChapterViewer from "../types/chapterViewer";
import { IntersiteManga } from "../types/intersite/IntersiteManga";
import Manga from "../types/manga";
import { ObjectUtils } from "../utils/object-utils";
import scraperController from "./scraper-controller";

class MangasController {
  public constructor() {}

  public async getAll({
    query,
  }: {
    query?: string;
  }): Promise<IntersiteManga[]> {
    return (await scrapersConfig.scrapers.mangaplus.scraper.getMangas({
      q: query,
    })) as any[];
  }

  public async get(id: string, src: string): Promise<Manga> {
    return await scrapersConfig.scrapers[src].scraper.getManga(id);
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
