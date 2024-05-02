"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultValues = void 0;
var DefaultValues;
(function (DefaultValues) {
    DefaultValues.LIFETIME = 60 * 1000; // 1min
    DefaultValues.LONG_CACHE_LIFETIME = 4 * 60 * 60 * 1000; //4h
    DefaultValues.FORMATTED_NAME_REGEX = new RegExp(`[^a-zA-Z0-9\ ]+`, "g");
    DefaultValues.DIG_IN_NAME_MIN_LENGTH = 3;
})(DefaultValues || (exports.DefaultValues = DefaultValues = {}));
