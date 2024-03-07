import config from "../config/config";
import formattedNameService from "../services/formatted-name.service";
import IntersiteChapter from "@services-common/types/intersite/IntersiteChapter";
import { IntersiteUtils } from "../utils/intersite-utils";
import Chapter from "@services-common/types/chapter";
import { SourceName } from "@services-common/types/primitives/id";

class LatestChaptersController {
  public constructor() {}

  public async get({
    srcs,
  }: {
    srcs?: SourceName[];
  }): Promise<IntersiteChapter[]> {
    const chaptersBySrc: { [src in SourceName]?: Chapter[] } = {};
    for (let src of srcs ? srcs : config.getEnabledSource()) {
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
