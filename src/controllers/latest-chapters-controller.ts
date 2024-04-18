import config from "../config/config";
import { SourceName } from "@shared/types/primitives/Identifiers";
import bdSyncService from "../services/BDSync.service";
import { ScrapedChapter } from "../../../shared/src/types/Chapter";

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
    for (let src of srcs ? srcs : config.getEnabledSource()) {
      const tmpChapteres = await config
        .getScraperOfSrc(src)
        .getLatestChapters();
      chapters.push(...tmpChapteres);
      if (syncWithBD) {
        bdSyncService.syncChapters(src, chapters);
      }
    }
    return chapters;
  }
}

export default new LatestChaptersController();
