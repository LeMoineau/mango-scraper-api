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
    generateChapterUrl(endpoint) {
        return text_format_utils_1.TextFormatUtils.isNumber(endpoint)
            ? `${this.PAGE_URL}/node/${endpoint}`
            : `${this.PAGE_URL}/chapter/${endpoint}`;
    }
    generateMangaUrl(endpoint) {
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
                        const mangaEndpoint = array_utils_1.ArrayUtils.getLastOf($(`${currentMangaPath} .item-list ul li .tl a`)
                            .attr("href")
                            .split("/"));
                        chapters.push({
                            src: "mangasaki",
                            endpoint: chapterEndpoint,
                            url: this.generateChapterUrl(chapterEndpoint),
                            title: $(`${currentChapterPath} a`).text(),
                            number: array_utils_1.ArrayUtils.getLastOf($(`${currentChapterPath} a`).text().split(" ")),
                            manga: {
                                title: $(`${currentMangaPath} .item-list ul li .tl a strong`).text(),
                                endpoint: mangaEndpoint,
                                url: this.generateMangaUrl(mangaEndpoint),
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
    searchMangas({ q }) {
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
                    url: this.generateMangaUrl(mangaEndpoint),
                });
            });
            return mangas;
        });
    }
    getManga(endpoint) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const $ = yield scraping_utils_1.ScrapingUtils.requestToCheerioPage(this.generateMangaUrl(endpoint));
                const mangaTitle = $("div#main .title").text();
                let chapters = [];
                $("div#main .node-manga table tbody tr").each((i) => {
                    const currentChapterPath = `div#main .node-manga table tbody tr:nth-child(${i + 1})`;
                    const chapterNumber = text_format_utils_1.TextFormatUtils.stringWithout($(`${currentChapterPath} a`).text(), mangaTitle);
                    const chapterEndpoint = array_utils_1.ArrayUtils.getLastOf($(`${currentChapterPath} a`).attr("href").split("/"));
                    chapters.push({
                        endpoint: chapterEndpoint,
                        url: this.generateChapterUrl(chapterEndpoint),
                        number: chapterNumber,
                        title: $(`${currentChapterPath} a`).text(),
                        releaseDate: new Date($(`${currentChapterPath} td:nth-child(2)`).text()),
                    });
                });
                const urlFirstChapter = $(`div#main .node-manga table tbody tr:nth-child(1) a`).attr("href");
                if (urlFirstChapter) {
                    const $2 = yield scraping_utils_1.ScrapingUtils.requestToCheerioPage(`${this.PAGE_URL}/${urlFirstChapter}`);
                    $2("select#edit-select-node option").each((i) => {
                        const currentChapter = $2(`select#edit-select-node option:nth-child(${i + 1})`);
                        const chapterNumber = text_format_utils_1.TextFormatUtils.stringWithout($(currentChapter).text(), mangaTitle);
                        const sameChapter = chapters.find((c) => c.number === chapterNumber);
                        if (!sameChapter) {
                            const chapterEndpoint = $(currentChapter).attr("value");
                            chapters.push({
                                endpoint: chapterEndpoint,
                                url: chapterEndpoint,
                                number: chapterNumber,
                                title: $(currentChapter).text(),
                            });
                        }
                    });
                }
                return {
                    src: "mangasaki",
                    endpoint,
                    url: this.generateMangaUrl(endpoint),
                    title: mangaTitle,
                    author: $(".node-manga .content .field:nth-child(4) .field-item").text(),
                    image: $(".node-manga .content .field:nth-child(1) img").attr("src"),
                    chapters,
                };
            }
            catch (error) {
                console.error(error);
                return;
            }
        });
    }
    getChapter(endpoint) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const $ = yield scraping_utils_1.ScrapingUtils.requestToCheerioPage(this.generateChapterUrl(endpoint));
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
                    url: this.generateChapterUrl(endpoint),
                    title,
                    number,
                    src: "mangasaki",
                    pages: pages.map((p) => {
                        return { url: p };
                    }),
                    manga: {
                        endpoint: mangaEndpoint,
                        url: this.generateChapterUrl(mangaEndpoint),
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
