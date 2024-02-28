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
const vitest_1 = require("vitest");
const mangasaki_scraper_1 = __importDefault(require("./mangasaki-scraper"));
const scraping_utils_1 = require("../../utils/scraping-utils");
const cheerio_1 = require("cheerio");
const actual_mangasaki_page_spec_1 = require("./__test-examples__/actual-mangasaki-page.spec");
const mangasaki_json_response_spec_1 = require("./__test-examples__/mangasaki-json-response.spec");
(0, vitest_1.describe)("mangasaki-scraper", () => {
    (0, vitest_1.describe)("getLatestChapters", () => {
        (0, vitest_1.it)("should return correct json when getting latest chapters", () => __awaiter(void 0, void 0, void 0, function* () {
            vitest_1.vi.spyOn(scraping_utils_1.ScrapingUtils, "requestToCheerioPage").mockResolvedValue((0, cheerio_1.load)(actual_mangasaki_page_spec_1.MANGASAKI_HOME_PAGE_HTML));
            const chapters = yield mangasaki_scraper_1.default.getLatestChapters();
            (0, vitest_1.expect)(chapters).toStrictEqual(mangasaki_json_response_spec_1.MANGASAKI_HOME_RESULT_JSON);
        }));
    });
    (0, vitest_1.describe)("getManga", () => {
        (0, vitest_1.it)("should return correct json", () => __awaiter(void 0, void 0, void 0, function* () {
            const ONE_PIECE_MANGA_ID = "303936";
            vitest_1.vi.spyOn(scraping_utils_1.ScrapingUtils, "requestToCheerioPage").mockResolvedValue((0, cheerio_1.load)(actual_mangasaki_page_spec_1.MANGASAKI_ONE_PIECE_MANGA_PAGE_HTML));
            const chapters = yield mangasaki_scraper_1.default.getManga(ONE_PIECE_MANGA_ID);
            (0, vitest_1.expect)(chapters).toStrictEqual(mangasaki_json_response_spec_1.MANGASAKI_MANGA_ONE_PIECE_RESULT_JSON);
        }));
    });
    (0, vitest_1.describe)("getChapterPages", () => {
        (0, vitest_1.it)("should return correct json", () => __awaiter(void 0, void 0, void 0, function* () {
            const ONE_PIECE_MANGA_ID = "303936";
            const ONE_PIECE_CHAPTER_ID = "one-piece-1108";
            vitest_1.vi.spyOn(scraping_utils_1.ScrapingUtils, "requestToCheerioPage").mockResolvedValue((0, cheerio_1.load)(actual_mangasaki_page_spec_1.MANGASAKI_ONE_PIECE_CHAPTER_PAGE_HTML));
            const chapters = yield mangasaki_scraper_1.default.getChapterPages(ONE_PIECE_MANGA_ID, ONE_PIECE_CHAPTER_ID);
            (0, vitest_1.expect)(chapters).toStrictEqual(mangasaki_json_response_spec_1.MANGASAKI_CHAPTER_ONE_PIECE_RESULT_JSON);
        }));
    });
});
