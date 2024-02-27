"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MangasakiUtils = void 0;
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
})(MangasakiUtils || (exports.MangasakiUtils = MangasakiUtils = {}));
