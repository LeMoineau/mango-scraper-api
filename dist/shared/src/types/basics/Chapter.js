"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isScrapedChapter = void 0;
const Identifiers_1 = require("../primitives/Identifiers");
/**
 * TYPES FUNCTION
 */
function isScrapedChapter(chapter) {
    return (chapter &&
        chapter.manga &&
        chapter.title &&
        chapter.src &&
        (0, Identifiers_1.isSourceName)(chapter.src) &&
        chapter.endpoint &&
        chapter.url &&
        chapter.number &&
        chapter.lang);
}
exports.isScrapedChapter = isScrapedChapter;
