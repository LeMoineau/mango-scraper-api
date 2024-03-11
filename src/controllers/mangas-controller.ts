import ChapterViewer from "@shared/types/chapterViewer";
import {
  IntersiteManga,
  IntersiteMangaInfos,
} from "@shared/types/intersite/IntersiteManga";
import Manga, { MangaSearchInfos } from "@shared/types/manga";
import { IntersiteUtils } from "../utils/intersite-utils";
import config from "../config/config";
import formattedNameService from "../services/formatted-name.service";
import {
  ChapterId,
  FormattedName,
  SourceName,
} from "@shared/types/primitives/id";
import chaptersPageService from "../services/chapters-page.service";

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
    let mangas: { [src in SourceName]?: MangaSearchInfos[] } = {};
    if (!ids && query) {
      // Par recherche
      for (let src of srcs ? srcs : config.getEnabledSource()) {
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
    const chapterViewer = await config
      .getScraperOfSrc(src)
      .getChapterPages(formattedName, chapterId);
    chaptersPageService.saveNewChapterViewer(
      src,
      formattedName,
      chapterId,
      chapterViewer
    );
    return chapterViewer;
  }

  public async getChapterPage(
    src: SourceName,
    formattedName: FormattedName,
    chapterId: ChapterId,
    pageNb: number
  ): Promise<any> {
    let chapterViewer = chaptersPageService.getChapterViewer(
      src,
      formattedName,
      chapterId
    );
    if (!chapterViewer) {
      chapterViewer = await this.getChapterPages(src, formattedName, chapterId);
    }
    return await config.getScraperOfSrc(src).getPage(chapterViewer, pageNb);
  }
}

export default new MangasController();
