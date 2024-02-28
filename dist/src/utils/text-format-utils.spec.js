"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const text_format_utils_1 = require("./text-format-utils");
(0, vitest_1.describe)("text-format-utils", () => {
    (0, vitest_1.it)("should remove left 0 when format chapter number", () => {
        const A_CHAPTER_NUMBER = "045";
        const res = text_format_utils_1.TextFormatUtils.formatChapterNumber(A_CHAPTER_NUMBER);
        (0, vitest_1.expect)(res).toBe("45");
    });
    (0, vitest_1.it)("should remove unused space when format chapter number", () => {
        const A_CHAPTER_NUMBER = "  45   ";
        const res = text_format_utils_1.TextFormatUtils.formatChapterNumber(A_CHAPTER_NUMBER);
        (0, vitest_1.expect)(res).toBe("45");
    });
    (0, vitest_1.it)("should not fail when chapter number is a string", () => {
        const A_CHAPTER_NUMBER = "S7-45";
        const res = text_format_utils_1.TextFormatUtils.formatChapterNumber(A_CHAPTER_NUMBER);
        (0, vitest_1.expect)(res).toBe("7-45");
    });
    (0, vitest_1.it)("should remove # when chapter number has a #", () => {
        const A_CHAPTER_NUMBER = "#141";
        const res = text_format_utils_1.TextFormatUtils.formatChapterNumber(A_CHAPTER_NUMBER);
        (0, vitest_1.expect)(res).toBe("141");
    });
    (0, vitest_1.it)("should put to lowercase when format manga title", () => {
        const A_MANGA_TITLE = "OnePiece";
        const res = text_format_utils_1.TextFormatUtils.formatMangaTitle(A_MANGA_TITLE);
        (0, vitest_1.expect)(res).toBe("onepiece");
    });
    (0, vitest_1.it)("should remove unused space when format manga title", () => {
        const A_MANGA_TITLE = "   onepiece    ";
        const res = text_format_utils_1.TextFormatUtils.formatMangaTitle(A_MANGA_TITLE);
        (0, vitest_1.expect)(res).toBe("onepiece");
    });
    (0, vitest_1.it)("it should keep only character when format manga title", () => {
        const A_MANGA_TITLE = "L'épopé";
        const res = text_format_utils_1.TextFormatUtils.formatMangaTitle(A_MANGA_TITLE);
        (0, vitest_1.expect)(res).toBe("lpop");
    });
    (0, vitest_1.describe)("isNumber", () => {
        (0, vitest_1.it)("should return true if string is a number", () => {
            const A_NUMBER_STRING = "123";
            (0, vitest_1.expect)(text_format_utils_1.TextFormatUtils.isNumber(A_NUMBER_STRING)).toBeTruthy();
        });
        (0, vitest_1.it)("should return false if string is not a number", () => {
            const A_NUMBER_STRING = "123a";
            (0, vitest_1.expect)(text_format_utils_1.TextFormatUtils.isNumber(A_NUMBER_STRING)).toBeFalsy();
        });
    });
    (0, vitest_1.describe)("stringWithout", () => {
        (0, vitest_1.it)("should remove target string of src string", () => {
            const A_STRING = "test a string";
            const THE_STRING_TO_REMOVE = "test";
            (0, vitest_1.expect)(text_format_utils_1.TextFormatUtils.stringWithout(A_STRING, THE_STRING_TO_REMOVE)).toBe("a string");
        });
        (0, vitest_1.it)("should remove all occurence of target string of src string", () => {
            const A_STRING = "test atest stringtest";
            const THE_STRING_TO_REMOVE = "test";
            (0, vitest_1.expect)(text_format_utils_1.TextFormatUtils.stringWithout(A_STRING, THE_STRING_TO_REMOVE)).toBe("a string");
        });
    });
});
