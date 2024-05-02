import config from "../config/config";
import { SourceName } from "@shared/types/primitives/Identifiers";
import { ScrapedChapter } from "../../../shared/src/types/basics/Chapter";
import BDSyncService from "../services/BDSync.service";

class LatestChaptersController {
  public constructor() {}

  public async getAll({
    srcs,
    syncWithBD,
  }: {
    srcs?: SourceName[];
    syncWithBD?: boolean;
  }): Promise<ScrapedChapter[]> {
    let chapters: ScrapedChapter[] = [];
    for (let src of srcs ?? config.getEnabledSource()) {
      const tmpChapteres = await config
        .getScraperOfSrc(src)
        .getLatestChapters();
      chapters.push(...tmpChapteres);
      if (syncWithBD) {
        console.log("sync with bd at", config.getEnv().MANGO_BD_API_URL);
        await BDSyncService.syncChapters(chapters);
      }
    }
    return chapters;
  }
}

export default new LatestChaptersController();
