"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RoutingError extends Error {
    constructor(message) {
        super(`a routing error occured during request parsing ${message && `: ${message}`}`);
    }
}
exports.default = RoutingError;
