"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cache_keys_1 = require("../config/cache-keys");
const cache_storage_service_1 = __importDefault(require("./cache-storage.service"));
const default_values_1 = require("../config/default-values");
class ChaptersPageService {
    constructor() {
        cache_storage_service_1.default.saveInCache(cache_keys_1.CacheKeys.CHAPTERS_PAGES, {}, default_values_1.DefaultValues.FORMATTED_NAME_LIFETIME);
    }
    _calculateKeyFrom(src, formattedName, chapterId) {
        return `${src}-${formattedName}-${chapterId}`;
    }
    saveNewChapterViewer(src, formattedName, chapterId, chapterViewer) {
        cache_storage_service_1.default.saveInJsonInCache(cache_keys_1.CacheKeys.CHAPTERS_PAGES, this._calculateKeyFrom(src, formattedName, chapterId), chapterViewer);
    }
    getChapterViewer(src, formattedName, chapterId) {
        const chapterViewer = cache_storage_service_1.default.loadFromJsonFromCache(cache_keys_1.CacheKeys.CHAPTERS_PAGES, this._calculateKeyFrom(src, formattedName, chapterId));
        return chapterViewer;
    }
}
exports.default = new ChaptersPageService();
