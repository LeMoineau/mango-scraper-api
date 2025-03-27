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
const array_utils_1 = require("../../../../shared/src/utils/array-utils");
const mangasaki_utils_1 = require("./utils/mangasaki-utils");
const text_format_utils_1 = require("../../../../shared/src/utils/text-format-utils");
const default_page_loader_1 = __importDefault(require("../defaults/default-page-loader"));
const CommonLangs_1 = require("../../../../shared/src/config/enums/CommonLangs");
const ScraperParsingError_1 = __importDefault(require("../../errors/ScraperParsingError"));
class SailMgScraper extends default_page_loader_1.default {
    constructor() {
        var _a;
        super(...arguments);
        this.SCRAPER_SOURCE_NAME = "sailmg";
        this.PAGE_URL = (_a = process.env.SAILMG_URL) !== null && _a !== void 0 ? _a : "https://www.sailmg.com";
    }
    _generateChapterUrl(endpoint) {
        return `${this.PAGE_URL}/content/${endpoint}`;
    }
    _generateMangaUrl(endpoint) {
        return `${this.PAGE_URL}/content/${endpoint}`;
    }
    getLatestChapters() {
        return __awaiter(this, void 0, void 0, function* () {
            const $ = yield scraping_utils_1.ScrapingUtils.requestToCheerioPage(`${this.PAGE_URL}/block_refresh/showmanga/lastest_list`);
            const chapters = [];
            $("ul#latest-list > li").each((i) => {
                const currentMangaPath = `ul#latest-list > li:nth-child(${i + 1})`;
                $(`${currentMangaPath} ul li ul li`).each((j) => {
                    const currentChapterPath = `${currentMangaPath} ul li ul li:nth-child(${j + 1})`;
                    const imageURL = $(`${currentMangaPath} a:first-child img`).attr("src");
                    const chapterEndpoint = array_utils_1.ArrayUtils.getLastOf($(`${currentChapterPath} a`).attr("href").split("/"));
                    const mangaTitle = $(`${currentMangaPath} ul li .tl a strong`).text();
                    const mangaEndpoint = array_utils_1.ArrayUtils.getLastOf($(`${currentMangaPath} ul li .tl a`).attr("href").split("/"));
                    chapters.push({
                        src: this.SCRAPER_SOURCE_NAME,
                        endpoint: chapterEndpoint,
                        url: this._generateChapterUrl(chapterEndpoint),
                        title: $(`${currentChapterPath} a`).text(),
                        number: mangasaki_utils_1.MangasakiUtils.formatChapterNumber($(`${currentChapterPath} a`).text(), mangaTitle),
                        manga: {
                            title: mangaTitle,
                            endpoint: mangaEndpoint,
                            url: this._generateMangaUrl(mangaEndpoint),
                        },
                        lang: CommonLangs_1.CommonLangs.ENGLISH,
                        image: imageURL.split("minicover").join("cover"),
                        releaseDate: mangasaki_utils_1.MangasakiUtils.calculateDateFromString($(`${currentChapterPath} .tm`).text()),
                    });
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
                    src: this.SCRAPER_SOURCE_NAME,
                    lang: CommonLangs_1.CommonLangs.ENGLISH,
                    url: this._generateMangaUrl(mangaEndpoint),
                });
            });
            return mangas;
        });
    }
    _generateMangaChapters($) {
        const mangaTitle = $("h1.page-header").text().trim();
        let chapters = [];
        $(".node-manga table tbody tr").each((i) => {
            const currentChapterPath = `.node-manga table tbody tr:nth-child(${i + 1})`;
            const chapterEndpoint = array_utils_1.ArrayUtils.getLastOf($(`${currentChapterPath} a`).attr("href").split("/"));
            chapters.push({
                endpoint: chapterEndpoint,
                url: this._generateChapterUrl(chapterEndpoint),
                number: mangasaki_utils_1.MangasakiUtils.formatChapterNumber($(`${currentChapterPath} a`).text(), mangaTitle),
                title: $(`${currentChapterPath} a`).text(),
                releaseDate: new Date($(`${currentChapterPath} td:nth-child(2)`).text()),
                lang: CommonLangs_1.CommonLangs.ENGLISH,
            });
        });
        return chapters;
    }
    getManga(endpoint) {
        return __awaiter(this, void 0, void 0, function* () {
            const $ = yield scraping_utils_1.ScrapingUtils.requestToCheerioPage(this._generateMangaUrl(endpoint));
            const mangaTitle = $("h1.page-header").text();
            return {
                src: this.SCRAPER_SOURCE_NAME,
                endpoint,
                url: this._generateMangaUrl(endpoint),
                title: mangaTitle,
                lang: CommonLangs_1.CommonLangs.ENGLISH,
                author: $(".node-manga .content .field-name-field-author .field-item").text(),
                image: $(".node-manga .content .field-name-field-image2 img").attr("src"),
                chapters: this._generateMangaChapters($),
            };
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
            const $ = yield scraping_utils_1.ScrapingUtils.requestToCheerioPage(this._generateChapterUrl(endpoint));
            console.log(this._generateChapterUrl(endpoint));
            let pages = $.html()
                .split(`,"showmanga":{"paths":["`)[1]
                .split(`"],"count_p":`)[0]
                .split('","');
            pages.splice(1, 1);
            const title = $("#edit-select-node option[selected='selected']")
                .text()
                .trim();
            const number = array_utils_1.ArrayUtils.getLastOf(title.split(" "));
            const mangaEndpointHref = $("h1.page-header a:not(.active)").attr("href");
            if (!mangaEndpointHref) {
                throw new ScraperParsingError_1.default("manga endpoint href not find");
            }
            const mangaEndpoint = array_utils_1.ArrayUtils.getLastOf(mangaEndpointHref.split("/"));
            return {
                endpoint,
                url: this._generateChapterUrl(endpoint),
                title,
                number,
                src: this.SCRAPER_SOURCE_NAME,
                lang: CommonLangs_1.CommonLangs.ENGLISH,
                pages: pages.map((p) => {
                    return { url: p };
                }),
                manga: {
                    endpoint: mangaEndpoint,
                    url: this._generateChapterUrl(mangaEndpoint),
                    title: text_format_utils_1.TextFormatUtils.stringWithout(title, number).trim(),
                },
            };
        });
    }
}
exports.default = new SailMgScraper();
