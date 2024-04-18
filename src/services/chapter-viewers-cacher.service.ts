import { CacheKeys } from "../config/cache-keys";
import cacheStorageService from "./cache-storage.service";
import { DefaultValues } from "../config/default-values";
import {
  ChapterEndpoint,
  MangaEndpoint,
  SourceName,
} from "@shared/types/primitives/id";
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
    mangaId: MangaEndpoint,
    chapterId: ChapterEndpoint
  ): string {
    return `${src}-${mangaId}-${chapterId}`;
  }

  public saveNewChapterViewer(
    src: SourceName,
    mangaId: MangaEndpoint,
    chapterId: ChapterEndpoint,
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
    mangaId: MangaEndpoint,
    chapterId: ChapterEndpoint
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
