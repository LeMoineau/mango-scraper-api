"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isManga = void 0;
const Identifiers_1 = require("../primitives/Identifiers");
/**
 * TYPES FUNCTION
 */
function isManga(manga) {
    return (manga &&
        manga.endpoint &&
        (0, Identifiers_1.isSourceName)(manga.src) &&
        manga.title &&
        manga.url &&
        manga.lang);
}
exports.isManga = isManga;
