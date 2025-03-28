"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UnknownCheerioMethodError extends Error {
    constructor(message) {
        super(`an unknown method has been encounter during cheerio parsing to json ${message && `: ${message}`}`);
    }
}
exports.default = UnknownCheerioMethodError;
