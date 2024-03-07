"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cache_keys_1 = require("../config/cache-keys");
const config_1 = __importDefault(require("../config/config"));
const default_values_1 = require("../config/default-values");
const FormattedNameError_1 = __importDefault(require("../errors/FormattedNameError"));
const array_utils_1 = require("../utils/array-utils");
const text_format_utils_1 = require("../utils/text-format-utils");
const cache_storage_service_1 = __importDefault(require("./cache-storage.service"));
class FormattedNameService {
    constructor() {
        if (!cache_storage_service_1.default.isCached(cache_keys_1.CacheKeys.FORMATTED_MANGA_NAMES)) {
            cache_storage_service_1.default.saveInCache(cache_keys_1.CacheKeys.FORMATTED_MANGA_NAMES, {}, default_values_1.DefaultValues.FORMATTED_NAME_LIFETIME);
        }
    }
    _loadMangaIds(formattedName) {
        return cache_storage_service_1.default.loadFromJsonFromCache(cache_keys_1.CacheKeys.FORMATTED_MANGA_NAMES, formattedName);
    }
    getMangaIdsFromFormattedName(formattedName, dontDigIn) {
        return __awaiter(this, void 0, void 0, function* () {
            let formattedNameData = this._loadMangaIds(formattedName);
            if (!formattedNameData) {
                return;
            }
            if (!array_utils_1.ArrayUtils.includesAll(formattedNameData.alreadyDigIn, config_1.default.getEnabledSource()) &&
                !dontDigIn) {
                yield this._digInFormattedNameData(formattedName, formattedNameData);
                this.updateFormattedName(formattedName, formattedNameData);
            }
            return formattedNameData.ids;
        });
    }
    _digInFormattedNameData(formattedName, formattedNameData) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let src of config_1.default.getEnabledSource()) {
                if (formattedNameData.alreadyDigIn.includes(src)) {
                    continue;
                }
                const mangaId = yield this._digInOneFormattedName(src, formattedNameData.name, formattedName);
                if (mangaId) {
                    formattedNameData.ids[src] = mangaId;
                }
                formattedNameData.alreadyDigIn.push(src);
            }
        });
    }
    _digInOneFormattedName(src, mangaName, formattedName) {
        return __awaiter(this, void 0, void 0, function* () {
            const wordToSearch = [mangaName, ...mangaName.split(" ")];
            for (let w of wordToSearch) {
                if (w.length < default_values_1.DefaultValues.DIG_IN_NAME_MIN_LENGTH) {
                    continue;
                }
                const mangas = yield config_1.default.getScraperOfSrc(src).getMangas({ q: w });
                const m = mangas.find((m) => text_format_utils_1.TextFormatUtils.formatMangaTitle(m.name) === formattedName);
                if (m) {
                    return m.id;
                }
            }
            return;
        });
    }
    saveFormattedName(formattedName, mangaName, intersiteIds) {
        cache_storage_service_1.default.saveInJsonInCache(cache_keys_1.CacheKeys.FORMATTED_MANGA_NAMES, formattedName, {
            name: mangaName
                .trim()
                .toLowerCase()
                .replace(default_values_1.DefaultValues.FORMATTED_NAME_REGEX, ""),
            ids: intersiteIds,
            alreadyDigIn: Object.keys(intersiteIds),
        }, default_values_1.DefaultValues.FORMATTED_NAME_LIFETIME);
    }
    updateFormattedName(formattedName, formatteNameData) {
        cache_storage_service_1.default.saveInJsonInCache(cache_keys_1.CacheKeys.FORMATTED_MANGA_NAMES, formattedName, formatteNameData, default_values_1.DefaultValues.FORMATTED_NAME_LIFETIME);
    }
    saveFormattedNameFromMangaInfos(intersiteMangaInfos) {
        this.saveFormattedName(intersiteMangaInfos.formattedName, this._getPreferedNameFromIntersiteMangaName(intersiteMangaInfos.name), intersiteMangaInfos.id);
    }
    _getPreferedNameFromIntersiteMangaName(intersiteMangaName) {
        for (let src of config_1.default.getEnabledSource()) {
            if (intersiteMangaName[src]) {
                return intersiteMangaName[src];
            }
        }
        throw new FormattedNameError_1.default(`no name found associate with formattedName in ${JSON.stringify(intersiteMangaName)}`);
    }
    saveFormattedNamesFromMangasInfos(intersiteMangasInfos) {
        for (let im of intersiteMangasInfos) {
            this.saveFormattedNameFromMangaInfos(im);
        }
    }
    saveFormattedNamesFromLatestChapters(intersiteChapters) {
        for (let ic of intersiteChapters) {
            this.saveFormattedName(ic.manga.formattedTitle, this._getPreferedNameFromIntersiteMangaName(ic.manga.title), ic.manga.id);
        }
    }
}
exports.default = new FormattedNameService();
