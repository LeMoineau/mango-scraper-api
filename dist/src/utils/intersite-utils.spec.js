"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const intersite_utils_1 = require("./intersite-utils");
const mangas_spec_1 = require("./__tests-examples__/mangas.spec");
const intersite_mangas_spec_1 = require("./__tests-examples__/intersite-mangas.spec");
const chapters_spec_1 = require("./__tests-examples__/chapters.spec");
const intersite_chapters_spec_1 = require("./__tests-examples__/intersite-chapters.spec");
(0, vitest_1.describe)("IntersiteUtils", () => {
    (0, vitest_1.describe)("convertMangasToIntersiteMangas", () => {
        (0, vitest_1.it)("should convert a manga to intersiteManga", () => {
            (0, vitest_1.expect)(intersite_utils_1.IntersiteUtils.convertMangasToIntersiteMangas({
                mangaplus: [mangas_spec_1.MANGAPLUS_MANGA_DANDADAN],
            })).toStrictEqual([intersite_mangas_spec_1.INTERSITE_MANGA_DANDADAN]);
        });
    });
    (0, vitest_1.describe)("convertChaptersInfosToIntersiteChaptersInfos", () => {
        (0, vitest_1.it)("should convert a list of chapters into intersite chapters infos", () => {
            (0, vitest_1.expect)(intersite_utils_1.IntersiteUtils.convertChaptersInfosToIntersiteChaptersInfos({
                mangaplus: [
                    chapters_spec_1.MANGAPLUS_CHAPTER_1_DANDADAN,
                    chapters_spec_1.MANGAPLUS_CHAPTER_2_DANDADAN,
                    chapters_spec_1.MANGAPLUS_CHAPTER_140_DANDADAN,
                    chapters_spec_1.MANGAPLUS_CHAPTER_141_DANDADAN,
                ],
            })).toStrictEqual([
                intersite_chapters_spec_1.INTERSITE_CHAPTER_1_DANDADAN,
                intersite_chapters_spec_1.INTERSITE_CHAPTER_2_DANDADAN,
                intersite_chapters_spec_1.INTERSITE_CHAPTER_140_DANDADAN,
                intersite_chapters_spec_1.INTERSITE_CHAPTER_141_DANDADAN,
            ]);
        });
    });
});
