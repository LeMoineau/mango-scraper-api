"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextFormatUtils = void 0;
var TextFormatUtils;
(function (TextFormatUtils) {
    function formatChapterNumber(chapterNumber) {
        let res = chapterNumber.trim().replace(/[^0-9\-]+/g, "");
        try {
            const numberRes = Number(res); // to remove left 0 as "045"
            if (!Number.isNaN(numberRes)) {
                res = `${numberRes}`;
            }
        }
        catch (_a) { }
        return res;
    }
    TextFormatUtils.formatChapterNumber = formatChapterNumber;
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
        const regex = new RegExp(`${strToRemove}`, "g");
        return src.replace(regex, "").trim();
    }
    TextFormatUtils.stringWithout = stringWithout;
})(TextFormatUtils || (exports.TextFormatUtils = TextFormatUtils = {}));
