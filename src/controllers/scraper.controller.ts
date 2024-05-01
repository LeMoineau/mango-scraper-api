import { ScrapedChapter } from "../../../shared/src/types/basics/Chapter";
import { ChapterPage } from "../../../shared/src/types/basics/ChapterPage";
import { Manga, ScrapedManga } from "../../../shared/src/types/basics/Manga";
import {
  ChapterEndpoint,
  MangaEndpoint,
  SourceName,
} from "../../../shared/src/types/primitives/Identifiers";

import config from "../config/config";
import Scraper from "../scrapers/scraper";
import BDSyncService from "../services/BDSync.service";

class ScraperController {
  private getScraperOf(src: SourceName): Scraper {
    return config.getScraperOfSrc(src);
  }

  public async getLatestChaptersOf(
    src: SourceName,
    props: { syncWithBD?: boolean }
  ): Promise<ScrapedChapter[]> {
    const chapters = await this.getScraperOf(src).getLatestChapters();
    if (props.syncWithBD) {
      await BDSyncService.syncChapters(chapters);
    }
    return chapters;
  }

  public async searchMangasOf(
    src: SourceName,
    props: { query: string; syncWithBD?: boolean }
  ): Promise<Manga[]> {
    const mangas = await this.getScraperOf(src).searchMangas({
      q: props.query,
    });
    if (props.syncWithBD) {
      await BDSyncService.syncMangas(mangas);
    }
    return mangas;
  }

  public async getMangaOf(
    src: SourceName,
    endpoint: MangaEndpoint,
    props: { syncWithBD?: boolean }
  ): Promise<ScrapedManga | undefined> {
    const manga = await this.getScraperOf(src).getManga(endpoint);
    if (manga && props.syncWithBD) {
      await BDSyncService.syncScrapedManga(manga);
    }
    return manga;
  }

  public async getChapterOf(
    src: SourceName,
    endpoint: ChapterEndpoint,
    props: { syncWithBD?: boolean }
  ): Promise<ScrapedChapter | undefined> {
    const chapter = await this.getScraperOf(src).getChapter(endpoint);
    if (chapter && props.syncWithBD) {
      await BDSyncService.syncChapter(chapter);
    }
    return chapter;
  }

  public async generatePageOf(
    src: SourceName,
    chapterPage: ChapterPage
  ): Promise<Buffer | undefined> {
    return await this.getScraperOf(src).generatePage(chapterPage);
  }
}

export default new ScraperController();
