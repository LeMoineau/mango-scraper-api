import cacheStorageService from "./cache-storage.service";
import {
  ChapterId,
  FormattedName,
  FormattedNumber,
} from "@shared/types/primitives/id";
import { IntersiteField } from "@shared/types/intersite/IntersiteField";
import { ChapterIdsInCache } from "./../types/in-storage/ChapterIdsInCache";
import { CacheKeys } from "./../config/cache-keys";
import { DefaultValues } from "./../config/default-values";

class ChapterIdsCacherService {
  constructor() {
    if (
      !cacheStorageService.isCached(CacheKeys.CHAPTER_IDS_BY_FORMATTED_NUMBER)
    ) {
      cacheStorageService.saveInCache(
        CacheKeys.CHAPTER_IDS_BY_FORMATTED_NUMBER,
        {},
        DefaultValues.LONG_CACHE_LIFETIME
      );
    }
  }

  /**
   * Save intersiteField of chapterId in the cache according to its formattedName manga and its formattedNumber
   * @param formattedName
   * @param formattedNumber
   * @param chapterIds
   */
  public assignChapterIdsToFormattedKeys(
    formattedName: FormattedName,
    formattedNumber: FormattedNumber,
    chapterIds: IntersiteField<ChapterId>
  ) {
    const json = cacheStorageService.loadFromCache<ChapterIdsInCache>(
      CacheKeys.CHAPTER_IDS_BY_FORMATTED_NUMBER
    );
    if (!json) {
      return;
    }
    if (!json[formattedName]) {
      json[formattedName] = {};
    }
    json[formattedName][formattedNumber] = chapterIds;
    cacheStorageService.saveInCache(
      CacheKeys.CHAPTER_IDS_BY_FORMATTED_NUMBER,
      json,
      DefaultValues.LONG_CACHE_LIFETIME
    );
  }

  /**
   * Get back chapterIds previously saved according to formatted keys (manga name and chapter number)
   * @param formattedName
   * @param formattedNumber
   * @returns targeted chapter ids or undefined if not found
   */
  public getChapterIdsFromFormattedKeys(
    formattedName: FormattedName,
    formattedNumber: FormattedNumber
  ): IntersiteField<ChapterId> | undefined {
    const json = cacheStorageService.loadFromCache<ChapterIdsInCache>(
      CacheKeys.CHAPTER_IDS_BY_FORMATTED_NUMBER
    );
    if (!json || !json[formattedName]) {
      return;
    }
    return json[formattedName][formattedNumber];
  }
}

export default new ChapterIdsCacherService();
