import config from "../config/config";
import formattedNameService from "../services/formatted-name.service";
import Chapter from "../types/chapter";
import IntersiteChapter from "../types/intersite/IntersiteChapter";
import { SourceName } from "../types/primitives/scrapersConfig";
import { IntersiteUtils } from "../utils/intersite-utils";

class LatestChaptersController {
  public constructor() {}

  public async get(): Promise<IntersiteChapter[]> {
    const chaptersBySrc: { [src in SourceName]?: Chapter[] } = {};
    for (let src of config.getEnabledSource()) {
      const chapters = await config.getScraperOfSrc(src).getLatestChapters();
      chaptersBySrc[src] = chapters;
    }
    const intersiteChapters =
      IntersiteUtils.convertChaptersToIntersiteChapters(chaptersBySrc);
    formattedNameService.saveFormattedNamesFromLatestChapters(
      intersiteChapters
    );
    return intersiteChapters;
  }
}

export default new LatestChaptersController();
