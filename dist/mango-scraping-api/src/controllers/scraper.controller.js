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
const config_1 = __importDefault(require("../config/config"));
const BDSync_service_1 = __importDefault(require("../services/BDSync.service"));
class ScraperController {
    getScraperOf(src) {
        return config_1.default.getScraperOfSrc(src);
    }
    getLatestChaptersOf(src, props) {
        return __awaiter(this, void 0, void 0, function* () {
            const chapters = yield this.getScraperOf(src).getLatestChapters();
            if (props.syncWithBD) {
                yield BDSync_service_1.default.syncChapters(chapters);
            }
            return chapters;
        });
    }
    searchMangasOf(src, props) {
        return __awaiter(this, void 0, void 0, function* () {
            const mangas = yield this.getScraperOf(src).searchMangas({
                q: props.query,
            });
            if (props.syncWithBD) {
                yield BDSync_service_1.default.syncMangas(mangas);
            }
            return mangas;
        });
    }
    getMangaOf(src, endpoint, props) {
        return __awaiter(this, void 0, void 0, function* () {
            const manga = yield this.getScraperOf(src).getManga(endpoint);
            if (manga && props.syncWithBD) {
                yield BDSync_service_1.default.syncScrapedManga(manga);
            }
            return manga;
        });
    }
    getChapterOf(src, endpoint, props) {
        return __awaiter(this, void 0, void 0, function* () {
            const chapter = yield this.getScraperOf(src).getChapter(endpoint);
            if (chapter && props.syncWithBD) {
                yield BDSync_service_1.default.syncChapter(chapter);
            }
            return chapter;
        });
    }
    generatePageOf(src, chapterPage) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getScraperOf(src).generatePage(chapterPage);
        });
    }
}
exports.default = new ScraperController();
