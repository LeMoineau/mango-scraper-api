import { SourceName } from "../types/primitives/scrapersConfig";
import ChapterViewer from "../types/chapterViewer";
import {
  IntersiteManga,
  IntersiteMangaInfos,
} from "../types/intersite/IntersiteManga";
import Manga, { MangaInfos } from "../types/manga";
import { IntersiteUtils } from "../utils/intersite-utils";
import config from "../config/config";
import formattedNameService from "../services/formatted-name.service";
import { ChapterId, FormattedName } from "../types/primitives/id";

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
  }): Promise<IntersiteMangaInfos[]> {
    let mangas: { [src in SourceName]?: MangaInfos[] } = {};
    if (ids && ids.length <= 0 && query) {
      // Par recherche
      for (let src of srcs && srcs.length > 0
        ? srcs
        : config.getEnabledSource()) {
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
      }
    }
    const intersiteMangasInfos =
      IntersiteUtils.convertMangasInfosToIntersiteMangasInfos(mangas);
    formattedNameService.saveFormattedNamesFromMangasInfos(
      intersiteMangasInfos
    );
    return intersiteMangasInfos;
  }

  public async get({
    formattedName,
    srcs,
    dontDigIn,
  }: {
    formattedName: string;
    srcs?: SourceName[];
    dontDigIn?: boolean;
  }): Promise<IntersiteManga | undefined> {
    const mangaIds = await formattedNameService.getMangaIdsFromFormattedName(
      formattedName,
      dontDigIn
    );
    if (!mangaIds) {
      return;
    }
    const mangasBySrc: { [key in SourceName]?: Manga[] } = {};
    for (let src of Object.keys(mangaIds) as SourceName[]) {
      if (srcs && !srcs.includes(src)) {
        continue;
      }
      mangasBySrc[src] = [
        await config.getScraperOfSrc(src).getManga(mangaIds[src]),
      ];
    }
    const intersiteMangas =
      IntersiteUtils.convertMangasToIntersiteMangas(mangasBySrc);
    return intersiteMangas.length > 0 ? intersiteMangas[0] : undefined;
  }

  public async getChapterPages(
    src: SourceName,
    formattedName: FormattedName,
    chapterId: ChapterId
  ): Promise<ChapterViewer> {
    return await config
      .getScraperOfSrc(src)
      .getChapterPages(formattedName, chapterId);
  }
}

export default new MangasController();
