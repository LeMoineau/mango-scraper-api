"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIntersiteManga = exports.IntersiteManga = void 0;
const Identifiers_1 = require("../primitives/Identifiers");
class IntersiteManga {
    constructor(id, formattedName, mangas) {
        this.id = id;
        this.formattedName = formattedName;
        this.mangas = mangas;
    }
    get langs() {
        return [...new Set(this.mangas.map((m) => m.lang))];
    }
}
exports.IntersiteManga = IntersiteManga;
/**
 * TYPES FUNCTION
 */
function isIntersiteManga(intersiteManga) {
    return (Array.isArray(intersiteManga.mangas) &&
        (0, Identifiers_1.isMangaFormattedName)(intersiteManga.formattedName));
}
exports.isIntersiteManga = isIntersiteManga;
