import { SourceName } from "../types/primitives/scrapersConfig";
import ChapterViewer from "../types/chapterViewer";
import { IntersiteManga } from "../types/intersite/IntersiteManga";
import Manga from "../types/manga";
import { IntersiteUtils } from "../utils/intersite-utils";
import config from "../config/config";

class MangasController {
  public constructor() {}

  public async getAll({
    query,
    srcs,
    ids,
  }: {
    query?: string;
    srcs?: SourceName[];
    ids?: string[];
  }): Promise<IntersiteManga[]> {
    let mangas: { [src in SourceName]?: Manga[] } = {};
    if (query) {
      // Par recherche
      for (let src of config.getEnabledSource()) {
        mangas[src] = await config.getScraperOfSrc(src).getMangas({
          q: query,
        });
      }
    } else if (srcs && ids && srcs.length === ids.length) {
      // Par sources et ids
      for (let i = 0; i < srcs.length; i++) {
        mangas[srcs[i]] = [
          await config.getScraperOfSrc(srcs[i]).getManga(ids[i]),
        ];
        console.log(mangas[srcs[i]], mangas[srcs[i]]![0].chapters);
      }
    }
    return IntersiteUtils.convertMangasToIntersiteMangas(mangas);
  }

  public async get(src: SourceName, id: string): Promise<Manga> {
    return await config.getScraperOfSrc(src).getManga(id);
  }

  public async getChapterPages(
    src: SourceName,
    mangaId: string,
    chapterId: string
  ): Promise<ChapterViewer> {
    return await config
      .getScraperOfSrc(src)
      .getChapterPages(mangaId, chapterId);
  }
}

export default new MangasController();
