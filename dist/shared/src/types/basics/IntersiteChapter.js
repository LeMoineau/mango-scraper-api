"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIntersiteChapter = exports.isParentlessIntersiteChapter = void 0;
const MangaNested_1 = require("../attributes/MangaNested");
const Identifiers_1 = require("../primitives/Identifiers");
/**
 * TYPES FUNCTION
 */
function isParentlessIntersiteChapter(intersiteChapter) {
    return (intersiteChapter &&
        Array.isArray(intersiteChapter.chapters) &&
        (0, Identifiers_1.isChapterFormattedName)(intersiteChapter.formattedName));
}
exports.isParentlessIntersiteChapter = isParentlessIntersiteChapter;
function isIntersiteChapter(intersiteChapter) {
    return (intersiteChapter.intersiteManga &&
        (0, MangaNested_1.isIdentifiedIntersiteMangaNested)(intersiteChapter.intersiteManga) &&
        isParentlessIntersiteChapter(intersiteChapter));
}
exports.isIntersiteChapter = isIntersiteChapter;
