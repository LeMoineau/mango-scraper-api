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
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../config/config"));
class BDSyncService {
    constructor() { }
    sync(endpoint, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield axios_1.default.post(`${config_1.default.getEnv().MANGO_BD_API_URL}/${endpoint}`, data);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    syncChapter(chapter) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sync("chapters", {
                chapter,
            });
        });
    }
    syncChapters(chapters) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let c of chapters) {
                yield this.syncChapter(c);
            }
        });
    }
    syncManga(manga) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sync("mangas", {
                manga,
            });
        });
    }
    syncMangas(mangas) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let m of mangas) {
                yield this.syncManga(m);
            }
        });
    }
    syncScrapedManga(manga) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.syncManga(manga);
            if (!manga.chapters)
                return;
            yield this.syncChapters(manga.chapters.map((c) => (Object.assign(Object.assign({}, c), { src: manga.src, manga: {
                    endpoint: manga.endpoint,
                    url: manga.url,
                    title: manga.title,
                } }))));
        });
    }
    syncScrapedMangas(mangas) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let m of mangas) {
                yield this.syncScrapedManga(m);
            }
        });
    }
}
exports.default = new BDSyncService();
