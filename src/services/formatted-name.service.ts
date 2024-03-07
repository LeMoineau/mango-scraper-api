import { CacheKeys } from "../config/cache-keys";
import config from "../config/config";
import { DefaultValues } from "../config/default-values";
import FormattedNameError from "../errors/FormattedNameError";
import IntersiteChapter from "@shared/types/intersite/IntersiteChapter";
import { IntersiteField } from "@shared/types/intersite/IntersiteField";
import { IntersiteMangaInfos } from "@shared/types/intersite/IntersiteManga";
import { FormattedName, MangaId } from "@shared/types/primitives/id";
import { SourceName } from "@shared/types/primitives/id";
import { ArrayUtils } from "../utils/array-utils";
import { TextFormatUtils } from "../utils/text-format-utils";
import cacheStorageService from "./cache-storage.service";

type FormattedNameInStorage = {
  name: string;
  ids: IntersiteField<MangaId>;
  alreadyDigIn: SourceName[];
};

class FormattedNameService {
  constructor() {
    if (!cacheStorageService.isCached(CacheKeys.FORMATTED_MANGA_NAMES)) {
      cacheStorageService.saveInCache(
        CacheKeys.FORMATTED_MANGA_NAMES,
        {},
        DefaultValues.FORMATTED_NAME_LIFETIME
      );
    }
  }

  private _loadMangaIds(
    formattedName: FormattedName
  ): FormattedNameInStorage | undefined {
    return cacheStorageService.loadFromJsonFromCache(
      CacheKeys.FORMATTED_MANGA_NAMES,
      formattedName
    );
  }

  public async getMangaIdsFromFormattedName(
    formattedName: FormattedName,
    dontDigIn?: boolean
  ): Promise<IntersiteField<MangaId> | undefined> {
    let formattedNameData = this._loadMangaIds(formattedName);
    if (!formattedNameData) {
      return;
    }
    if (
      !ArrayUtils.includesAll(
        formattedNameData.alreadyDigIn,
        config.getEnabledSource()
      ) &&
      !dontDigIn
    ) {
      await this._digInFormattedNameData(formattedName, formattedNameData);
      this.updateFormattedName(formattedName, formattedNameData);
    }
    return formattedNameData.ids;
  }

  private async _digInFormattedNameData(
    formattedName: FormattedName,
    formattedNameData: FormattedNameInStorage
  ): Promise<void> {
    for (let src of config.getEnabledSource()) {
      if (formattedNameData.alreadyDigIn.includes(src)) {
        continue;
      }
      const mangaId = await this._digInOneFormattedName(
        src,
        formattedNameData.name,
        formattedName
      );
      if (mangaId) {
        formattedNameData.ids[src] = mangaId;
      }
      formattedNameData.alreadyDigIn.push(src);
    }
  }

  private async _digInOneFormattedName(
    src: SourceName,
    mangaName: string,
    formattedName: FormattedName
  ): Promise<MangaId | undefined> {
    const wordToSearch = [mangaName, ...mangaName.split(" ")];
    for (let w of wordToSearch) {
      if (w.length < DefaultValues.DIG_IN_NAME_MIN_LENGTH) {
        continue;
      }
      const mangas = await config.getScraperOfSrc(src).getMangas({ q: w });
      const m = mangas.find(
        (m) => TextFormatUtils.formatMangaTitle(m.name) === formattedName
      );
      if (m) {
        return m.id;
      }
    }
    return;
  }

  public saveFormattedName(
    formattedName: FormattedName,
    mangaName: string,
    intersiteIds: IntersiteField<MangaId>
  ) {
    cacheStorageService.saveInJsonInCache<FormattedNameInStorage>(
      CacheKeys.FORMATTED_MANGA_NAMES,
      formattedName,
      {
        name: mangaName
          .trim()
          .toLowerCase()
          .replace(DefaultValues.FORMATTED_NAME_REGEX, ""),
        ids: intersiteIds,
        alreadyDigIn: Object.keys(intersiteIds) as SourceName[],
      },
      DefaultValues.FORMATTED_NAME_LIFETIME
    );
  }

  public updateFormattedName(
    formattedName: FormattedName,
    formatteNameData: FormattedNameInStorage
  ) {
    cacheStorageService.saveInJsonInCache<FormattedNameInStorage>(
      CacheKeys.FORMATTED_MANGA_NAMES,
      formattedName,
      formatteNameData,
      DefaultValues.FORMATTED_NAME_LIFETIME
    );
  }

  public saveFormattedNameFromMangaInfos(
    intersiteMangaInfos: IntersiteMangaInfos
  ) {
    this.saveFormattedName(
      intersiteMangaInfos.formattedName,
      this._getPreferedNameFromIntersiteMangaName(intersiteMangaInfos.name),
      intersiteMangaInfos.id
    );
  }

  private _getPreferedNameFromIntersiteMangaName(
    intersiteMangaName: IntersiteField<string>
  ): string {
    for (let src of config.getEnabledSource()) {
      if (intersiteMangaName[src]) {
        return intersiteMangaName[src];
      }
    }
    throw new FormattedNameError(
      `no name found associate with formattedName in ${JSON.stringify(
        intersiteMangaName
      )}`
    );
  }

  public saveFormattedNamesFromMangasInfos(
    intersiteMangasInfos: IntersiteMangaInfos[]
  ) {
    for (let im of intersiteMangasInfos) {
      this.saveFormattedNameFromMangaInfos(im);
    }
  }

  public saveFormattedNamesFromLatestChapters(
    intersiteChapters: IntersiteChapter[]
  ) {
    for (let ic of intersiteChapters) {
      this.saveFormattedName(
        ic.manga.formattedTitle,
        this._getPreferedNameFromIntersiteMangaName(ic.manga.title),
        ic.manga.id
      );
    }
  }
}

export default new FormattedNameService();
