import axios from "axios";
import config from "../config/config";
import {
  ScrapedChapter,
  SourcelessChapter,
} from "../../../shared/src/types/Chapter";
import { Manga, ScrapedManga } from "../../../shared/src/types/Manga";

class BDSyncService {
  constructor() {}

  private async sync(endpoint: string, data: any): Promise<void> {
    try {
      await axios.post(`${config.getEnv().MANGO_BD_API_URL}/${endpoint}`, data);
    } catch (e) {
      console.error(e);
    }
  }

  public async syncChapter(chapter: ScrapedChapter): Promise<void> {
    await this.sync("chapters", {
      chapter,
    });
  }

  public async syncChapters(chapters: ScrapedChapter[]): Promise<void> {
    for (let c of chapters) {
      await this.syncChapter(c);
    }
  }

  public async syncManga(manga: Manga): Promise<void> {
    await this.sync("mangas", {
      manga,
    });
  }

  public async syncMangas(mangas: Manga[]): Promise<void> {
    for (let m of mangas) {
      await this.syncManga(m);
    }
  }

  public async syncScrapedManga(manga: ScrapedManga): Promise<void> {
    await this.syncManga(manga);
    await this.syncChapters(
      manga.chapters.map(
        (c: SourcelessChapter): ScrapedChapter => ({
          ...c,
          src: manga.src,
          manga: {
            endpoint: manga.endpoint,
            title: manga.title,
          },
        })
      )
    );
  }

  public async syncScrapedMangas(mangas: ScrapedManga[]): Promise<void> {
    for (let m of mangas) {
      await this.syncScrapedManga(m);
    }
  }
}

export default new BDSyncService();
