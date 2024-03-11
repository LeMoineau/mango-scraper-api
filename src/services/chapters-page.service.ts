import { CacheKeys } from "../config/cache-keys";
import cacheStorageService from "./cache-storage.service";
import { DefaultValues } from "../config/default-values";
import {
  ChapterId,
  FormattedName,
  SourceName,
} from "@shared/types/primitives/id";
import ChapterViewer from "@shared/types/chapterViewer";

class ChaptersPageService {
  constructor() {
    cacheStorageService.saveInCache(
      CacheKeys.CHAPTERS_PAGES,
      {},
      DefaultValues.FORMATTED_NAME_LIFETIME
    );
  }

  private _calculateKeyFrom(
    src: SourceName,
    formattedName: FormattedName,
    chapterId: ChapterId
  ): string {
    return `${src}-${formattedName}-${chapterId}`;
  }

  public saveNewChapterViewer(
    src: SourceName,
    formattedName: FormattedName,
    chapterId: ChapterId,
    chapterViewer: ChapterViewer
  ) {
    cacheStorageService.saveInJsonInCache(
      CacheKeys.CHAPTERS_PAGES,
      this._calculateKeyFrom(src, formattedName, chapterId),
      chapterViewer
    );
  }

  public getChapterViewer(
    src: SourceName,
    formattedName: FormattedName,
    chapterId: ChapterId
  ): ChapterViewer | undefined {
    const chapterViewer =
      cacheStorageService.loadFromJsonFromCache<ChapterViewer>(
        CacheKeys.CHAPTERS_PAGES,
        this._calculateKeyFrom(src, formattedName, chapterId)
      );
    return chapterViewer;
  }
}

export default new ChaptersPageService();
