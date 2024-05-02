"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isChapterPage = void 0;
/**
 * TYPES FUNCTION
 */
function isChapterPage(page) {
    return (page.url &&
        (page.decryptionKey ? typeof page.decryptionKey === "string" : true));
}
exports.isChapterPage = isChapterPage;
