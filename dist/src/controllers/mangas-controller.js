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
const intersite_utils_1 = require("../utils/intersite-utils");
const config_1 = __importDefault(require("../config/config"));
const formatted_name_service_1 = __importDefault(require("../services/formatted-name.service"));
class MangasController {
    constructor() { }
    getAll({ query, srcs, ids, }) {
        return __awaiter(this, void 0, void 0, function* () {
            let mangas = {};
            if (ids && ids.length <= 0 && query) {
                // Par recherche
                for (let src of srcs && srcs.length > 0
                    ? srcs
                    : config_1.default.getEnabledSource()) {
                    mangas[src] = yield config_1.default.getScraperOfSrc(src).getMangas({
                        q: query,
                    });
                }
            }
            else if (srcs && ids && srcs.length === ids.length) {
                // Par sources et ids
                for (let i = 0; i < srcs.length; i++) {
                    mangas[srcs[i]] = [
                        yield config_1.default.getScraperOfSrc(srcs[i]).getManga(ids[i]),
                    ];
                }
            }
            const intersiteMangasInfos = intersite_utils_1.IntersiteUtils.convertMangasInfosToIntersiteMangasInfos(mangas);
            formatted_name_service_1.default.saveFormattedNamesFromMangasInfos(intersiteMangasInfos);
            return intersiteMangasInfos;
        });
    }
    get({ formattedName, srcs, dontDigIn, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const mangaIds = yield formatted_name_service_1.default.getMangaIdsFromFormattedName(formattedName, dontDigIn);
            if (!mangaIds) {
                return;
            }
            const mangasBySrc = {};
            for (let src of Object.keys(mangaIds)) {
                if (srcs && !srcs.includes(src)) {
                    continue;
                }
                mangasBySrc[src] = [
                    yield config_1.default.getScraperOfSrc(src).getManga(mangaIds[src]),
                ];
            }
            const intersiteMangas = intersite_utils_1.IntersiteUtils.convertMangasToIntersiteMangas(mangasBySrc);
            return intersiteMangas.length > 0 ? intersiteMangas[0] : undefined;
        });
    }
    getChapterPages(src, formattedName, chapterId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield config_1.default
                .getScraperOfSrc(src)
                .getChapterPages(formattedName, chapterId);
        });
    }
}
exports.default = new MangasController();
