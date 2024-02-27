"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FormattedNameError extends Error {
    constructor(message) {
        super(`error encounter when dealing with formatted names ${message && `: ${message}`}`);
    }
}
exports.default = FormattedNameError;
