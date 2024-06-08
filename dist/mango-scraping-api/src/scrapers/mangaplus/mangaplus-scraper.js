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
const array_utils_1 = require("./../../../../shared/src/utils/array-utils");
const mangaplus_utils_1 = require("./utils/mangaplus-utils");
const CacheStorage_service_1 = __importDefault(require("../../services/CacheStorage.service"));
const cache_keys_1 = require("../../config/cache-keys");
const axios_1 = __importDefault(require("axios"));
class MangaPlusScraper {
    constructor() {
        var _a;
        this.API_ENDPOINT = (_a = process.env.MANGAPLUS_API_ENDPOINT) !== null && _a !== void 0 ? _a : "https://jumpg-webapi.tokyo-cdn.com/api";
    }
    _generateChapterUrl(endpoint) {
        return `https://mangaplus.shueisha.co.jp/viewer/${endpoint}`;
    }
    _generateMangaUrl(endpoint) {
        return `https://mangaplus.shueisha.co.jp/titles/${endpoint}`;
    }
    /**
     * Get the list of the latest chapters from mangaplus api
     * @returns a list of the latest chapters
     */
    getLatestChapters() {
        return __awaiter(this, void 0, void 0, function* () {
            const jsonRes = yield mangaplus_utils_1.MangaplusUtils.decodeJsonFromMangaPlusRequest(`${this.API_ENDPOINT}/web/web_homeV4?lang=eng&clang=`, `${__dirname}/protos/web_homeV4.proto`, "mangaplus.Web_homeV4");
            const chapters = [];
            const currentDate = new Date();
            try {
                for (let s of jsonRes.parent.data.sections) {
                    for (let card of s.cards) {
                        for (let chapter of card.chapters) {
                            chapters.push({
                                src: "mangaplus",
                                endpoint: chapter.id.toString(),
                                url: this._generateChapterUrl(chapter.id.toString()),
                                title: chapter.title,
                                number: array_utils_1.ArrayUtils.tryingSplitAndGet(chapter.chapter, "#", 1),
                                image: chapter.manga.portraitThumbnail,
                                releaseDate: currentDate,
                                manga: {
                                    title: chapter.manga.title,
                                    endpoint: chapter.manga.id.toString(),
                                    url: this._generateMangaUrl(chapter.manga.id.toString()),
                                },
                            });
                        }
                    }
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
    searchMangas({ q }) {
        return __awaiter(this, void 0, void 0, function* () {
            let allMangas = [];
            if (!CacheStorage_service_1.default.isCached(cache_keys_1.CacheKeys.MANGAPLUS_ALL_MANGAS)) {
                const jsonRes = yield mangaplus_utils_1.MangaplusUtils.decodeJsonFromMangaPlusRequest(`${this.API_ENDPOINT}/title_list/allV2`, `${__dirname}/protos/allV2.proto`, "mangaplus.AllV2");
                allMangas = jsonRes.parent.data.mangas.map((m) => ({
                    src: "mangaplus",
                    endpoint: m.translations[0].id.toString(),
                    url: this._generateMangaUrl(m.translations[0].id.toString()),
                    title: m.title,
                    author: m.translations[0].author,
                    image: m.translations[0].portraitThumbnail,
                }));
                CacheStorage_service_1.default.saveInCache(cache_keys_1.CacheKeys.MANGAPLUS_ALL_MANGAS, allMangas, 15 * 24 * 60 * 60 * 1000);
            }
            else {
                allMangas = CacheStorage_service_1.default.loadFromCache(cache_keys_1.CacheKeys.MANGAPLUS_ALL_MANGAS);
            }
            let mangasFound = [];
            if (q) {
                mangasFound = allMangas.filter((m) => {
                    return (m.title.toLowerCase().includes(q.toLowerCase()) ||
                        q.toLowerCase().includes(m.title.toLowerCase()));
                });
            }
            return mangasFound;
        });
    }
    _generateMangaChapters(jsonRes) {
        let chapters = [];
        for (let c of jsonRes.parent.data.chapters) {
            for (let label of [
                "freeInitialChapters",
                "appExclusiveChapters",
                "freeLatestChapters",
            ])
                if (c[label])
                    chapters.push(...array_utils_1.ArrayUtils.transformEachItemOf(c[label], (item) => ({
                        endpoint: `${item.chapterId}`,
                        url: this._generateChapterUrl(item.chapterId),
                        number: item.chapter,
                        title: item.title,
                        image: item.thumbnail,
                        releaseDate: new Date(item.releaseDate * 1000),
                    })));
        }
        return chapters;
    }
    /**
     * Get all informations about a manga including its chapters
     * @param id mangaplus manga id
     * @returns targeted manga informations including chapters
     */
    getManga(endpoint) {
        return __awaiter(this, void 0, void 0, function* () {
            const jsonRes = yield mangaplus_utils_1.MangaplusUtils.decodeJsonFromMangaPlusRequest(`${this.API_ENDPOINT}/title_detailV3?title_id=${endpoint}`, `${__dirname}/protos/title_detailV3.proto`, "mangaplus.Title_detailV3");
            return {
                endpoint,
                src: "mangaplus",
                url: this._generateMangaUrl(endpoint),
                title: jsonRes.parent.data.manga.title,
                author: jsonRes.parent.data.manga.author,
                image: jsonRes.parent.data.manga.portraitThumbnail,
                chapters: this._generateMangaChapters(jsonRes),
            };
        });
    }
    getMangaChapters(endpoint, props) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (props.pageNumber > 1) {
                return {
                    elements: [],
                    pageNumber: props.pageNumber,
                    pageSize: (_a = props.pageSize) !== null && _a !== void 0 ? _a : 0,
                };
            }
            const jsonRes = yield mangaplus_utils_1.MangaplusUtils.decodeJsonFromMangaPlusRequest(`${this.API_ENDPOINT}/title_detailV3?title_id=${endpoint}`, `${__dirname}/protos/title_detailV3.proto`, "mangaplus.Title_detailV3");
            const chapters = this._generateMangaChapters(jsonRes);
            return {
                elements: chapters,
                pageNumber: props.pageNumber,
                pageSize: chapters.length,
            };
        });
    }
    /**
     * Get the chapter viewer including all its pages
     * @param mangaId mangaplus manga id
     * @param chapterId mangaplus chapter id
     * @returns the chapter viewer of the chapter including all its pages
     */
    getChapter(chapterId) {
        return __awaiter(this, void 0, void 0, function* () {
            const jsonRes = yield mangaplus_utils_1.MangaplusUtils.decodeJsonFromMangaPlusRequest(`${this.API_ENDPOINT}/manga_viewer?chapter_id=${chapterId}&split=yes&img_quality=high`, `${__dirname}/protos/manga_viewer.proto`, "mangaplus.Manga_viewer");
            try {
                const pages = [
                    ...array_utils_1.ArrayUtils.transformEachItemOf(jsonRes.parent.data.pages, (item) => {
                        if (!item || !item.image)
                            return;
                        return {
                            url: item.image.url,
                            decryptionKey: item.image.decryptionKey,
                        };
                    }),
                ];
                return {
                    src: "mangaplus",
                    endpoint: chapterId,
                    url: this._generateChapterUrl(chapterId),
                    title: `${jsonRes.parent.data.titleName} - ${jsonRes.parent.data.chapterName}`,
                    number: jsonRes.parent.data.chapterName,
                    pages: pages,
                    manga: {
                        endpoint: jsonRes.parent.data.titleId,
                        url: this._generateMangaUrl(jsonRes.parent.data.titleId),
                        title: jsonRes.parent.data.titleName,
                    },
                };
            }
            catch (error) {
                console.error(error);
                return;
            }
        });
    }
    generatePage(chapterPage) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield axios_1.default.get(new URL(chapterPage.url).href, {
                    responseType: "arraybuffer",
                });
                if (!chapterPage.decryptionKey) {
                    return res.data;
                }
                return mangaplus_utils_1.MangaplusUtils.decodeImageMangaPlus(res.data, chapterPage.decryptionKey);
            }
            catch (err) {
                console.error(err);
                return;
            }
        });
    }
}
exports.default = new MangaPlusScraper();
