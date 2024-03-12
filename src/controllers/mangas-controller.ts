import ChapterViewer from "@shared/types/chapterViewer";
import {
  IntersiteManga,
  IntersiteMangaInfos,
} from "@shared/types/intersite/IntersiteManga";
import Manga, { MangaSearchInfos } from "@shared/types/manga";
import { IntersiteUtils } from "../utils/intersite-utils";
import config from "../config/config";
import mangaIdsCacherService from "../services/manga-ids-cacher.service";
import {
  ChapterId,
  FormattedName,
  FormattedNumber,
  MangaId,
  SourceName,
} from "@shared/types/primitives/id";
import chapterViewerCacherService from "../services/chapter-viewers-cacher.service";
import { IntersiteChapterViewer } from "@shared/types/intersite/IntersiteChapterViewer";
import chapterIdsCacherService from "./../services/chapter-ids-cacher.service";

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
    mangaIdsCacherService.saveFormattedNamesFromMangasInfos(
      intersiteMangasInfos
    );
    return intersiteMangasInfos;
  }

  public async getByFormattedName({
    formattedName,
    srcs,
    dontDigIn,
  }: {
    formattedName: string;
    srcs?: SourceName[];
    dontDigIn?: boolean;
  }): Promise<IntersiteManga | undefined> {
    const mangaIds = await mangaIdsCacherService.getMangaIdsFromFormattedName(
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
      mangasBySrc[src] = [await this.getById(src, mangaIds[src])];
    }
    const intersiteMangas =
      IntersiteUtils.convertMangasToIntersiteMangas(mangasBySrc);
    if (intersiteMangas.length <= 0) {
      return;
    }
    const targetIntersiteManga = intersiteMangas[0];
    for (let c of targetIntersiteManga.chapters) {
      chapterIdsCacherService.assignChapterIdsToFormattedKeys(
        targetIntersiteManga.formattedName,
        c.formattedNumber,
        c.id
      );
    }
    return targetIntersiteManga;
  }

  public async getById(src: SourceName, mangaId: MangaId): Promise<Manga> {
    return await config.getScraperOfSrc(src).getManga(mangaId);
  }

  public async getChapterByFormattedKey({
    formattedName,
    formattedNumber,
    srcs,
    dontDigIn,
  }: {
    formattedName: FormattedName;
    formattedNumber: FormattedNumber;
    srcs?: SourceName[];
    dontDigIn?: boolean;
  }): Promise<IntersiteChapterViewer | undefined> {
    const mangaIds = await mangaIdsCacherService.getMangaIdsFromFormattedName(
      formattedName,
      dontDigIn ?? true
    );
    if (!mangaIds) {
      console.log("pas de mangaIds");
      return;
    }
    const chapterIds = chapterIdsCacherService.getChapterIdsFromFormattedKeys(
      formattedName,
      formattedNumber
    );
    if (!chapterIds) {
      console.log("pas de chapter ids");
      return;
    }
    const chapterViewerBySrc: { [src in SourceName]?: ChapterViewer } = {};
    for (let src of srcs ?? (Object.keys(chapterIds) as SourceName[])) {
      chapterViewerBySrc[src] = await this.getChapterById(
        src,
        mangaIds[src],
        chapterIds[src]
      );
    }
    return IntersiteUtils.convertChapterViewerBySrcToIntersiteChapterViewer(
      chapterViewerBySrc,
      formattedNumber
    );
  }

  public async getChapterById(
    src: SourceName,
    mangaId: MangaId,
    chapterId: ChapterId
  ): Promise<ChapterViewer> {
    const chapterViewer = await config
      .getScraperOfSrc(src)
      .getChapterViewer(mangaId, chapterId);
    chapterViewerCacherService.saveNewChapterViewer(
      src,
      mangaId,
      chapterId,
      chapterViewer
    );
    return chapterViewer;
  }

  public async getChapterPageById(
    src: SourceName,
    mangaId: MangaId,
    chapterId: ChapterId,
    pageNb: number
  ): Promise<Buffer> {
    let chapterViewer = chapterViewerCacherService.getChapterViewer(
      src,
      mangaId,
      chapterId
    );
    if (!chapterViewer) {
      chapterViewer = await this.getChapterById(src, mangaId, chapterId);
    }
    return await config.getScraperOfSrc(src).getPage(chapterViewer, pageNb);
  }
}

export default new MangasController();
