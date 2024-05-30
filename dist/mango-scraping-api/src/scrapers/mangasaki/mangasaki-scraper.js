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
const scraping_utils_1 = require("../../utils/scraping-utils");
const array_utils_1 = require("./../../../../shared/src/utils/array-utils");
const mangasaki_utils_1 = require("./utils/mangasaki-utils");
const text_format_utils_1 = require("./../../../../shared/src/utils/text-format-utils");
const default_page_loader_1 = __importDefault(require("../defaults/default-page-loader"));
class MangaSakiScraper extends default_page_loader_1.default {
    constructor() {
        var _a;
        super(...arguments);
        this.PAGE_URL = (_a = process.env.MANGASAKI_URL) !== null && _a !== void 0 ? _a : "https://www.mangasaki.org";
    }
    _generateChapterUrl(endpoint) {
        return text_format_utils_1.TextFormatUtils.isNumber(endpoint)
            ? `${this.PAGE_URL}/node/${endpoint}`
            : `${this.PAGE_URL}/chapter/${endpoint}`;
    }
    _generateMangaUrl(endpoint) {
        return text_format_utils_1.TextFormatUtils.isNumber(endpoint)
            ? `${this.PAGE_URL}/node/${endpoint}`
            : `${this.PAGE_URL}/manga/${endpoint}`;
    }
    getLatestChapters() {
        return __awaiter(this, void 0, void 0, function* () {
            const $ = yield scraping_utils_1.ScrapingUtils.requestToCheerioPage(`${this.PAGE_URL}/block_refresh/showmanga/lastest_list`);
            const chapters = [];
            $("ul#latest-list > li").each((i) => {
                const currentMangaPath = `ul#latest-list > li:nth-child(${i + 1})`;
                $(`${currentMangaPath} .item-list ul li .item-list ul li`).each((j) => {
                    const currentChapterPath = `${currentMangaPath} .item-list ul li .item-list ul li:nth-child(${j + 1})`;
                    try {
                        const imageURL = $(`${currentMangaPath} a:first-child img`).attr("src");
                        const chapterEndpoint = array_utils_1.ArrayUtils.getLastOf($(`${currentChapterPath} a`).attr("href").split("/"));
                        const mangaTitle = $(`${currentMangaPath} .item-list ul li .tl a strong`).text();
                        const mangaEndpoint = array_utils_1.ArrayUtils.getLastOf($(`${currentMangaPath} .item-list ul li .tl a`)
                            .attr("href")
                            .split("/"));
                        chapters.push({
                            src: "mangasaki",
                            endpoint: chapterEndpoint,
                            url: this._generateChapterUrl(chapterEndpoint),
                            title: $(`${currentChapterPath} a`).text(),
                            number: mangasaki_utils_1.MangasakiUtils.formatChapterNumber($(`${currentChapterPath} a`).text(), mangaTitle),
                            manga: {
                                title: mangaTitle,
                                endpoint: mangaEndpoint,
                                url: this._generateMangaUrl(mangaEndpoint),
                            },
                            image: imageURL.split("minicover").join("bigcover"),
                            releaseDate: mangasaki_utils_1.MangasakiUtils.calculateDateFromString($(`${currentChapterPath} .tm`).text()),
                        });
                    }
                    catch (e) { }
                });
            });
            return chapters;
        });
    }
    searchMangas({ q, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const $ = yield scraping_utils_1.ScrapingUtils.requestToCheerioPage(`${this.PAGE_URL}/search/node/${q}`);
            let mangas = [];
            $(".search-results li").each((i) => {
                const targetSearch = `.search-results li:nth-child(${i + 1}) a`;
                const mangaEndpoint = array_utils_1.ArrayUtils.getLastOf($(targetSearch).attr("href").split("/"));
                mangas.push({
                    endpoint: mangaEndpoint,
                    title: $(targetSearch).text(),
                    src: "mangasaki",
                    url: this._generateMangaUrl(mangaEndpoint),
                });
            });
            return mangas;
        });
    }
    _generateMangaChapters($) {
        const mangaTitle = $("div#main .title").text().trim();
        let chapters = [];
        $("div#main .node-manga table tbody tr").each((i) => {
            const currentChapterPath = `div#main .node-manga table tbody tr:nth-child(${i + 1})`;
            const chapterEndpoint = array_utils_1.ArrayUtils.getLastOf($(`${currentChapterPath} a`).attr("href").split("/"));
            chapters.push({
                endpoint: chapterEndpoint,
                url: this._generateChapterUrl(chapterEndpoint),
                number: mangasaki_utils_1.MangasakiUtils.formatChapterNumber($(`${currentChapterPath} a`).text(), mangaTitle),
                title: $(`${currentChapterPath} a`).text(),
                releaseDate: new Date($(`${currentChapterPath} td:nth-child(2)`).text()),
            });
        });
        return chapters;
    }
    getManga(endpoint) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const $ = yield scraping_utils_1.ScrapingUtils.requestToCheerioPage(this._generateMangaUrl(endpoint));
                const mangaTitle = $("div#main .title").text();
                return {
                    src: "mangasaki",
                    endpoint,
                    url: this._generateMangaUrl(endpoint),
                    title: mangaTitle,
                    author: $(".node-manga .content .field:nth-child(4) .field-item").text(),
                    image: $(".node-manga .content .field:nth-child(1) img").attr("src"),
                    chapters: this._generateMangaChapters($),
                };
            }
            catch (error) {
                console.error(error);
                return;
            }
        });
    }
    getMangaChapters(endpoint, props) {
        return __awaiter(this, void 0, void 0, function* () {
            const $ = yield scraping_utils_1.ScrapingUtils.requestToCheerioPage(`${this._generateMangaUrl(endpoint)}?page=${props.pageNumber - 1}`);
            const chapters = this._generateMangaChapters($);
            return {
                elements: chapters,
                pageNumber: props.pageNumber,
                pageSize: chapters.length,
            };
        });
    }
    getChapter(endpoint) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const $ = yield scraping_utils_1.ScrapingUtils.requestToCheerioPage(this._generateChapterUrl(endpoint));
                let pages = $.html()
                    .split(`,"showmanga":{"paths":["`)[1]
                    .split(`"],"count_p":`)[0]
                    .split('","');
                pages.splice(1, 1);
                const title = $("h1.title").text().split("|")[0].trim();
                const number = array_utils_1.ArrayUtils.getLastOf(title.split(" "));
                const mangaEndpoint = array_utils_1.ArrayUtils.getLastOf($("h1.title a").attr("href").split("/"));
                return {
                    endpoint,
                    url: this._generateChapterUrl(endpoint),
                    title,
                    number,
                    src: "mangasaki",
                    pages: pages.map((p) => {
                        return { url: p };
                    }),
                    manga: {
                        endpoint: mangaEndpoint,
                        url: this._generateChapterUrl(mangaEndpoint),
                        title: text_format_utils_1.TextFormatUtils.stringWithout(title, number).trim(),
                    },
                };
            }
            catch (err) {
                console.error(err);
                return;
            }
        });
    }
}
exports.default = new MangaSakiScraper();
