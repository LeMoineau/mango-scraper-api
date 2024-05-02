"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIdentifiedIntersiteMangaNested = exports.isIdentifiedMangaNested = exports.isMangaNested = void 0;
const Identifiers_1 = require("../primitives/Identifiers");
const Identified_1 = require("./Identified");
/**
 * TYPES FUNCTION
 */
function isMangaNested(manga) {
    return (manga &&
        typeof manga.title === "string" &&
        typeof manga.endpoint === "string" &&
        typeof manga.url === "string");
}
exports.isMangaNested = isMangaNested;
function isIdentifiedMangaNested(manga) {
    return (0, Identified_1.isIdentified)(manga) && isMangaNested(manga);
}
exports.isIdentifiedMangaNested = isIdentifiedMangaNested;
function isIdentifiedIntersiteMangaNested(manga) {
    return (manga &&
        manga.formattedName &&
        (0, Identifiers_1.isMangaFormattedName)(manga.formattedName) &&
        (0, Identified_1.isIdentified)(manga));
}
exports.isIdentifiedIntersiteMangaNested = isIdentifiedIntersiteMangaNested;
