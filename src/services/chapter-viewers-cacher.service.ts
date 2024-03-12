import { CacheKeys } from "../config/cache-keys";
import cacheStorageService from "./cache-storage.service";
import { DefaultValues } from "../config/default-values";
import { ChapterId, MangaId, SourceName } from "@shared/types/primitives/id";
import ChapterViewer from "@shared/types/chapterViewer";

class ChapterViewerCacherService {
  constructor() {
    cacheStorageService.saveInCache(
      CacheKeys.CHAPTERS_PAGES,
      {},
      DefaultValues.LONG_CACHE_LIFETIME
    );
  }

  private _calculateKeyFrom(
    src: SourceName,
    mangaId: MangaId,
    chapterId: ChapterId
  ): string {
    return `${src}-${mangaId}-${chapterId}`;
  }

  public saveNewChapterViewer(
    src: SourceName,
    mangaId: MangaId,
    chapterId: ChapterId,
    chapterViewer: ChapterViewer
  ) {
    cacheStorageService.saveInJsonInCache(
      CacheKeys.CHAPTERS_PAGES,
      this._calculateKeyFrom(src, mangaId, chapterId),
      chapterViewer,
      DefaultValues.LONG_CACHE_LIFETIME
    );
  }

  public getChapterViewer(
    src: SourceName,
    mangaId: MangaId,
    chapterId: ChapterId
  ): ChapterViewer | undefined {
    const chapterViewer =
      cacheStorageService.loadFromJsonFromCache<ChapterViewer>(
        CacheKeys.CHAPTERS_PAGES,
        this._calculateKeyFrom(src, mangaId, chapterId)
      );
    return chapterViewer;
  }
}

export default new ChapterViewerCacherService();
