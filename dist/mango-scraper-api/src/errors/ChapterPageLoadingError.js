"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ChapterPageLoadingError extends Error {
    constructor(message) {
        super(`error encounter when loading chapter images ${message && `: ${message}`}`);
    }
}
exports.default = ChapterPageLoadingError;
