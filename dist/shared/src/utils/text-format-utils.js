"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextFormatUtils = void 0;
var TextFormatUtils;
(function (TextFormatUtils) {
    function formatChapterName(chapterNumber, chapterMangaTitle) {
        let res = chapterNumber.trim().replace(/[^0-9\-]+/g, "");
        try {
            if (isNumber(res)) {
                res = `${Number(res)}`;
            }
        }
        catch (_a) { }
        return `${formatMangaTitle(chapterMangaTitle)}-${res}`;
    }
    TextFormatUtils.formatChapterName = formatChapterName;
    function formatMangaTitle(title) {
        let res = title
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z0-9]+/g, "");
        return res;
    }
    TextFormatUtils.formatMangaTitle = formatMangaTitle;
    function isNumber(str) {
        return !Number.isNaN(Number(str));
    }
    TextFormatUtils.isNumber = isNumber;
    /**
     * Remove a string from a string
     * @param strToRemove string to remove
     * @returns string without the string to remove
     */
    function stringWithout(src, strToRemove) {
        return src.split(strToRemove).join("").trim();
    }
    TextFormatUtils.stringWithout = stringWithout;
})(TextFormatUtils || (exports.TextFormatUtils = TextFormatUtils = {}));
