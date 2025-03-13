"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isChapterFormattedName = exports.isMangaFormattedName = exports.isSourceName = exports.isUUID = void 0;
/**
 * TYPES FUNCTIONS
 */
function isUUID(str) {
    return typeof str === "string";
}
exports.isUUID = isUUID;
function isSourceName(str) {
    return typeof str === "string"; // [mangaplus", "mangasaki", "sailmg"].includes(str);
}
exports.isSourceName = isSourceName;
function isMangaFormattedName(str) {
    return typeof str === "string";
}
exports.isMangaFormattedName = isMangaFormattedName;
function isChapterFormattedName(str) {
    return typeof str === "string";
}
exports.isChapterFormattedName = isChapterFormattedName;
