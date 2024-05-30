"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MangasakiUtils = void 0;
const text_format_utils_1 = require("../../../../../shared/src/utils/text-format-utils");
var MangasakiUtils;
(function (MangasakiUtils) {
    function calculateDateFromString(dateStr) {
        const d = new Date();
        const [nbStr, timePrimitive, _] = dateStr.split(" ");
        const nb = parseInt(nbStr);
        if (timePrimitive === "minute" || timePrimitive === "minutes") {
            d.setMinutes(d.getMinutes() - nb);
        }
        else if (timePrimitive === "hour" || timePrimitive === "hours") {
            d.setHours(d.getHours() - nb);
        }
        else if (timePrimitive === "day" || timePrimitive === "days") {
            d.setDate(d.getDate() - nb);
        }
        return d;
    }
    MangasakiUtils.calculateDateFromString = calculateDateFromString;
    function formatChapterNumber(chapterName, mangaTitle) {
        return text_format_utils_1.TextFormatUtils.stringWithout(chapterName.toUpperCase(), mangaTitle.toUpperCase()).trim();
    }
    MangasakiUtils.formatChapterNumber = formatChapterNumber;
})(MangasakiUtils || (exports.MangasakiUtils = MangasakiUtils = {}));
