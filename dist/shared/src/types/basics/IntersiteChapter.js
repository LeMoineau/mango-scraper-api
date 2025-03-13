"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIntersiteChapter = exports.isParentlessIntersiteChapter = exports.IntersiteChapter = void 0;
const MangaNested_1 = require("../attributes/MangaNested");
const Identifiers_1 = require("../primitives/Identifiers");
class IntersiteChapter {
    constructor(id, formattedName, intersiteManga, chapters) {
        this.id = id;
        this.formattedName = formattedName;
        this.intersiteManga = intersiteManga;
        this.chapters = chapters;
    }
    get langs() {
        return [...new Set(this.chapters.map((c) => c.lang))];
    }
}
exports.IntersiteChapter = IntersiteChapter;
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
