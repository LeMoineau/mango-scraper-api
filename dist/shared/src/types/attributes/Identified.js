"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIdentified = void 0;
const Identifiers_1 = require("../primitives/Identifiers");
/**
 * TYPES FUNCTION
 */
function isIdentified(ident) {
    return ident && ident.id && (0, Identifiers_1.isUUID)(ident.id);
}
exports.isIdentified = isIdentified;
