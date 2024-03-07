"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntersiteUtils = void 0;
const text_format_utils_1 = require("./text-format-utils");
var IntersiteUtils;
(function (IntersiteUtils) {
    function convertMangasInfosToIntersiteMangasInfos(mangasInfosBySrc) {
        let intersiteMangasInfos = [];
        for (let src of Object.keys(mangasInfosBySrc)) {
            for (let manga of mangasInfosBySrc[src]) {
                const formattedName = text_format_utils_1.TextFormatUtils.formatMangaTitle(manga.name);
                let sameManga = intersiteMangasInfos.find((m) => m.formattedName === formattedName);
                if (!sameManga) {
                    sameManga = {
                        id: {},
                        name: {},
                        formattedName,
                        author: {},
                        image: {},
                    };
                    intersiteMangasInfos.push(sameManga);
                }
                sameManga.id[src] = manga.id;
                sameManga.name[src] = manga.name;
                if (manga.author)
                    sameManga.author[src] = manga.author;
                if (manga.image)
                    sameManga.image[src] = manga.image;
            }
        }
        return intersiteMangasInfos;
    }
    IntersiteUtils.convertMangasInfosToIntersiteMangasInfos = convertMangasInfosToIntersiteMangasInfos;
    function convertMangasToIntersiteMangas(mangasBySrc) {
        let intersiteMangas = [];
        let chaptersBySrcByMangas = {};
        for (let src of Object.keys(mangasBySrc)) {
            for (let manga of mangasBySrc[src]) {
                const formattedName = text_format_utils_1.TextFormatUtils.formatMangaTitle(manga.name);
                let sameManga = intersiteMangas.find((m) => m.formattedName === formattedName);
                if (!sameManga) {
                    sameManga = {
                        id: {},
                        name: {},
                        formattedName,
                        author: {},
                        image: {},
                        chapters: [],
                    };
                    chaptersBySrcByMangas[formattedName] = {};
                    intersiteMangas.push(sameManga);
                }
                sameManga.id[src] = manga.id;
                sameManga.name[src] = manga.name;
                sameManga.author[src] = manga.author;
                sameManga.image[src] = manga.image;
                chaptersBySrcByMangas[formattedName][src] = manga.chapters;
            }
        }
        for (let formattedName of Object.keys(chaptersBySrcByMangas)) {
            const targetManga = intersiteMangas.find((m) => m.formattedName === formattedName);
            if (!targetManga) {
                continue;
            }
            targetManga.chapters =
                IntersiteUtils.convertChaptersInfosToIntersiteChaptersInfos(chaptersBySrcByMangas[formattedName]);
        }
        return intersiteMangas;
    }
    IntersiteUtils.convertMangasToIntersiteMangas = convertMangasToIntersiteMangas;
    function convertChaptersInfosToIntersiteChaptersInfos(chaptersBySrc) {
        let intersiteChapters = [];
        for (let src of Object.keys(chaptersBySrc)) {
            for (let chapter of chaptersBySrc[src]) {
                const formattedNumber = text_format_utils_1.TextFormatUtils.formatChapterNumber(chapter.number);
                let sameChapter = intersiteChapters.find((c) => c.formattedNumber === formattedNumber);
                if (!sameChapter) {
                    sameChapter = {
                        id: {},
                        number: {},
                        formattedNumber: formattedNumber,
                        title: {},
                        image: {},
                        realeaseDate: {},
                    };
                    intersiteChapters.push(sameChapter);
                }
                sameChapter.id[src] = chapter.id;
                sameChapter.number[src] = chapter.number;
                sameChapter.title[src] = chapter.title;
                if (chapter.image)
                    sameChapter.image[src] = chapter.image;
                if (chapter.releaseDate)
                    sameChapter.realeaseDate[src] = chapter.releaseDate;
            }
        }
        return intersiteChapters;
    }
    IntersiteUtils.convertChaptersInfosToIntersiteChaptersInfos = convertChaptersInfosToIntersiteChaptersInfos;
    function convertChaptersToIntersiteChapters(chaptersBySrc) {
        let intersiteChapters = [];
        for (let src of Object.keys(chaptersBySrc)) {
            for (let chapter of chaptersBySrc[src]) {
                const formattedMangaName = text_format_utils_1.TextFormatUtils.formatMangaTitle(chapter.manga.title);
                const formattedNumber = text_format_utils_1.TextFormatUtils.formatChapterNumber(chapter.number);
                let sameChapter = intersiteChapters.find((c) => c.formattedNumber === formattedNumber &&
                    c.manga.formattedTitle === formattedMangaName);
                if (!sameChapter) {
                    sameChapter = {
                        id: {},
                        number: {},
                        formattedNumber: formattedNumber,
                        title: {},
                        image: {},
                        realeaseDate: {},
                        manga: {
                            id: {},
                            title: {},
                            formattedTitle: formattedMangaName,
                        },
                    };
                    intersiteChapters.push(sameChapter);
                }
                sameChapter.id[src] = chapter.id;
                sameChapter.number[src] = chapter.number;
                sameChapter.title[src] = chapter.title;
                if (chapter.image)
                    sameChapter.image[src] = chapter.image;
                if (chapter.releaseDate)
                    sameChapter.realeaseDate[src] = chapter.releaseDate;
                sameChapter.manga.id[src] = chapter.manga.id;
                sameChapter.manga.title[src] = chapter.manga.title;
            }
        }
        return intersiteChapters;
    }
    IntersiteUtils.convertChaptersToIntersiteChapters = convertChaptersToIntersiteChapters;
})(IntersiteUtils || (exports.IntersiteUtils = IntersiteUtils = {}));
