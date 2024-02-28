"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const mangasaki_utils_1 = require("./mangasaki-utils");
const dateEquals = (d1, d2) => {
    return (d1.getDate() === d2.getDate() &&
        d1.getHours() == d2.getHours() &&
        d1.getMinutes() == d2.getMinutes());
};
const substractDays = (d, nb) => {
    d.setDate(d.getDate() - nb);
    return d;
};
const substractHours = (d, nb) => {
    d.setHours(d.getHours() - nb);
    return d;
};
const substractMinutes = (d, nb) => {
    d.setMinutes(d.getMinutes() - nb);
    return d;
};
(0, vitest_1.describe)("mangasaki-utils", () => {
    (0, vitest_1.it)('should calculate date from "hours ago"', () => {
        (0, vitest_1.expect)(dateEquals(mangasaki_utils_1.MangasakiUtils.calculateDateFromString("8 hours ago"), substractHours(new Date(), 8))).toBeTruthy();
    });
    (0, vitest_1.it)('should calculate date from "hour ago"', () => {
        (0, vitest_1.expect)(dateEquals(mangasaki_utils_1.MangasakiUtils.calculateDateFromString("8 hour ago"), substractHours(new Date(), 8))).toBeTruthy();
    });
    (0, vitest_1.it)('should calculate date from "minutes ago"', () => {
        (0, vitest_1.expect)(dateEquals(mangasaki_utils_1.MangasakiUtils.calculateDateFromString("8 minutes ago"), substractMinutes(new Date(), 8))).toBeTruthy();
    });
    (0, vitest_1.it)('should calculate date from "minute ago"', () => {
        (0, vitest_1.expect)(dateEquals(mangasaki_utils_1.MangasakiUtils.calculateDateFromString("8 minutes ago"), substractMinutes(new Date(), 8))).toBeTruthy();
    });
    (0, vitest_1.it)('should calculate date from "days ago"', () => {
        (0, vitest_1.expect)(dateEquals(mangasaki_utils_1.MangasakiUtils.calculateDateFromString("8 days ago"), substractDays(new Date(), 8))).toBeTruthy();
    });
    (0, vitest_1.it)('should calculate date from "day ago"', () => {
        (0, vitest_1.expect)(dateEquals(mangasaki_utils_1.MangasakiUtils.calculateDateFromString("8 days ago"), substractDays(new Date(), 8))).toBeTruthy();
    });
    (0, vitest_1.it)('should calculate date from "days X hours X minutes ago"', () => {
        (0, vitest_1.expect)(dateEquals(mangasaki_utils_1.MangasakiUtils.calculateDateFromString("8 days 14 hours 16 minutes ago"), substractDays(new Date(), 8))).toBeTruthy();
    });
});
