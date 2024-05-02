"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIntersiteManga = void 0;
const Identifiers_1 = require("../primitives/Identifiers");
/**
 * TYPES FUNCTION
 */
function isIntersiteManga(intersiteManga) {
    return (Array.isArray(intersiteManga.mangas) &&
        (0, Identifiers_1.isMangaFormattedName)(intersiteManga.formattedName));
}
exports.isIntersiteManga = isIntersiteManga;
