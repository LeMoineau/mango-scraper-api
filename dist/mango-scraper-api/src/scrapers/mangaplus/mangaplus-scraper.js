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
const ScraperParsingError_1 = __importDefault(require("../../errors/ScraperParsingError"));
const array_utils_1 = require("../../utils/array-utils");
const text_format_utils_1 = require("../../utils/text-format-utils");
const mangaplus_utils_1 = require("./utils/mangaplus-utils");
const cache_storage_service_1 = __importDefault(require("../../services/cache-storage.service"));
const cache_keys_1 = require("../../config/cache-keys");
class MangaPlusScraper {
    constructor() {
        var _a;
        this.API_ENDPOINT = (_a = process.env.MANGAPLUS_API_ENDPOINT) !== null && _a !== void 0 ? _a : "https://jumpg-webapi.tokyo-cdn.com/api";
    }
    /**
     * Get the list of the latest chapters from mangaplus api
     * @returns a list of the latest chapters
     */
    getLatestChapters() {
        return __awaiter(this, void 0, void 0, function* () {
            const jsonRes = yield mangaplus_utils_1.MangaplusUtils.decodeJsonFromMangaPlusRequest(`${this.API_ENDPOINT}/web/web_homeV3?lang=eng`, `${__dirname}/protos/web_homeV3.proto`, "mangaplus.Web_homeV3");
            const chapters = [];
            const currentDate = new Date();
            try {
                for (let s of jsonRes.parent.data.sections) {
                    chapters.push(...s.cards.map((c) => {
                        return {
                            number: text_format_utils_1.TextFormatUtils.formatChapterNumber(array_utils_1.ArrayUtils.tryingSplitAndGet(c.chapter.chapter, "#", 1)),
                            id: c.chapter.id.toString(),
                            image: c.chapter.manga.portraitThumbnail,
                            releaseDate: currentDate,
                            title: c.chapter.title,
                            manga: {
                                title: c.mangaTitle,
                                id: c.chapter.manga.id.toString(),
                            },
                        };
                    }));
                    currentDate.setDate(currentDate.getDate() - 1);
                }
            }
            catch (error) {
                console.error(error);
                throw new ScraperParsingError_1.default("json recieved from manga plus api not have the expected format");
            }
            return chapters;
        });
    }
    /**
     * Get all mangas from an user search
     * @returns a list of all mangas which correspond to user search
     */
    getMangas({ q }) {
        return __awaiter(this, void 0, void 0, function* () {
            let allMangas = [];
            if (!cache_storage_service_1.default.isCached(cache_keys_1.CacheKeys.MANGAPLUS_ALL_MANGAS)) {
                const jsonRes = yield mangaplus_utils_1.MangaplusUtils.decodeJsonFromMangaPlusRequest(`${this.API_ENDPOINT}/title_list/allV2`, `${__dirname}/protos/allV2.proto`, "mangaplus.AllV2");
                allMangas = jsonRes.parent.data.mangas.map((m) => {
                    return {
                        id: `${m.translations[0].id}`,
                        name: m.title,
                        author: m.translations[0].author,
                        image: m.translations[0].portraitThumbnail,
                    };
                });
                cache_storage_service_1.default.saveInCache(cache_keys_1.CacheKeys.MANGAPLUS_ALL_MANGAS, allMangas, 15 * 24 * 60 * 60 * 1000);
            }
            else {
                allMangas = cache_storage_service_1.default.loadFromCache(cache_keys_1.CacheKeys.MANGAPLUS_ALL_MANGAS);
            }
            let mangasFound = [];
            if (q) {
                mangasFound = allMangas.filter((m) => {
                    return (m.name.toLowerCase().includes(q.toLowerCase()) ||
                        q.toLowerCase().includes(m.name.toLowerCase()));
                });
            }
            return mangasFound;
        });
    }
    /**
     * Get all informations about a manga including its chapters
     * @param id mangaplus manga id
     * @returns targeted manga informations including chapters
     */
    getManga(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const jsonRes = yield mangaplus_utils_1.MangaplusUtils.decodeJsonFromMangaPlusRequest(`${this.API_ENDPOINT}/title_detailV3?title_id=${id}`, `${__dirname}/protos/title_detailV3.proto`, "mangaplus.Title_detailV3");
            try {
                let chapters = [];
                for (let c of jsonRes.parent.data.chapters) {
                    for (let label of [
                        "freeInitialChapters",
                        "appExclusiveChapters",
                        "freeLatestChapters",
                    ])
                        if (c[label])
                            chapters.push(...array_utils_1.ArrayUtils.transformEachItemOf(c[label], (item) => {
                                return {
                                    id: `${item.chapterId}`,
                                    number: item.chapter,
                                    title: item.title,
                                    image: item.thumbnail,
                                    releaseDate: new Date(item.releaseDate * 1000),
                                    expirationDate: new Date(item.expirationDate * 1000),
                                };
                            }));
                }
                const manga = {
                    id: id,
                    name: jsonRes.parent.data.manga.title,
                    author: jsonRes.parent.data.manga.author,
                    image: jsonRes.parent.data.manga.portraitThumbnail,
                    chapters: chapters,
                };
                return manga;
            }
            catch (error) {
                console.error(error);
                throw new ScraperParsingError_1.default("json received from manga plus api not have the expected format");
            }
        });
    }
    /**
     * Get the chapter viewer including all its pages
     * @param mangaId mangaplus manga id
     * @param chapterId mangaplus chapter id
     * @returns the chapter viewer of the chapter including all its pages
     */
    getChapterPages(_, chapterId) {
        return __awaiter(this, void 0, void 0, function* () {
            const jsonRes = yield mangaplus_utils_1.MangaplusUtils.decodeJsonFromMangaPlusRequest(`${this.API_ENDPOINT}/manga_viewer?chapter_id=${chapterId}&split=yes&img_quality=high`, `${__dirname}/protos/manga_viewer.proto`, "mangaplus.Manga_viewer");
            try {
                const res = {
                    pages: [
                        ...array_utils_1.ArrayUtils.transformEachItemOf(jsonRes.parent.data.pages, (item) => {
                            if (!item || !item.image)
                                return;
                            return {
                                url: item.image.url,
                                decryptionKey: item.image.decryptionKey,
                                width: item.image.width,
                                height: item.image.height,
                            };
                        }),
                    ],
                };
                return res;
            }
            catch (error) {
                console.error(error);
                throw new ScraperParsingError_1.default("json received from manga plus api not have the expected format");
            }
        });
    }
}
exports.default = new MangaPlusScraper();
