import Chapter, { ChapterInfos } from "../types/chapter";
import IntersiteChapter, {
  IntersiteChapterInfos,
} from "../types/intersite/IntersiteChapter";
import {
  IntersiteManga,
  IntersiteMangaInfos,
} from "../types/intersite/IntersiteManga";
import Manga, { MangaInfos } from "../types/manga";
import { SourceName } from "../types/primitives/scrapersConfig";
import { TextFormatUtils } from "./text-format-utils";

export namespace IntersiteUtils {
  export function convertMangasInfosToIntersiteMangasInfos(mangasInfosBySrc: {
    [src in SourceName]?: MangaInfos[];
  }): IntersiteMangaInfos[] {
    let intersiteMangasInfos: IntersiteMangaInfos[] = [];
    for (let src of Object.keys(mangasInfosBySrc) as SourceName[]) {
      for (let manga of mangasInfosBySrc[src]!) {
        const formattedName = TextFormatUtils.formatMangaTitle(manga.name);
        let sameManga = intersiteMangasInfos.find(
          (m) => m.formattedName === formattedName
        );
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
        sameManga.author[src] = manga.author;
        sameManga.image[src] = manga.image;
      }
    }
    return intersiteMangasInfos;
  }

  export function convertMangasToIntersiteMangas(mangasBySrc: {
    [src in SourceName]?: Manga[];
  }): IntersiteManga[] {
    let intersiteMangas: IntersiteManga[] = [];
    let chaptersBySrcByMangas: {
      [formattedName: string]: { [src in SourceName]?: ChapterInfos[] };
    } = {};

    for (let src of Object.keys(mangasBySrc) as SourceName[]) {
      for (let manga of mangasBySrc[src]!) {
        const formattedName = TextFormatUtils.formatMangaTitle(manga.name);
        let sameManga = intersiteMangas.find(
          (m) => m.formattedName === formattedName
        );
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
      const targetManga = intersiteMangas.find(
        (m) => m.formattedName === formattedName
      );
      if (!targetManga) {
        continue;
      }
      targetManga.chapters =
        IntersiteUtils.convertChaptersInfosToIntersiteChaptersInfos(
          chaptersBySrcByMangas[formattedName]
        );
    }
    return intersiteMangas;
  }

  export function convertChaptersInfosToIntersiteChaptersInfos(chaptersBySrc: {
    [src in SourceName]?: ChapterInfos[];
  }): IntersiteChapterInfos[] {
    let intersiteChapters: IntersiteChapterInfos[] = [];
    for (let src of Object.keys(chaptersBySrc) as SourceName[]) {
      for (let chapter of chaptersBySrc[src]!) {
        const formattedNumber = TextFormatUtils.formatChapterNumber(
          chapter.number
        );
        let sameChapter = intersiteChapters.find(
          (c) => c.formattedNumber === formattedNumber
        );
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
        if (chapter.image) sameChapter.image[src] = chapter.image;
        if (chapter.releaseDate)
          sameChapter.realeaseDate[src] = chapter.releaseDate;
      }
    }
    return intersiteChapters;
  }

  export function convertChaptersToIntersiteChapters(chaptersBySrc: {
    [src in SourceName]?: Chapter[];
  }): IntersiteChapter[] {
    let intersiteChapters: IntersiteChapter[] = [];
    for (let src of Object.keys(chaptersBySrc) as SourceName[]) {
      for (let chapter of chaptersBySrc[src]!) {
        const formattedMangaName = TextFormatUtils.formatMangaTitle(
          chapter.manga.title
        );
        const formattedNumber = TextFormatUtils.formatChapterNumber(
          chapter.number
        );
        let sameChapter = intersiteChapters.find(
          (c) =>
            c.formattedNumber === formattedNumber &&
            c.manga.formattedTitle === formattedMangaName
        );
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
        if (chapter.image) sameChapter.image[src] = chapter.image;
        if (chapter.releaseDate)
          sameChapter.realeaseDate[src] = chapter.releaseDate;
        sameChapter.manga.id[src] = chapter.manga.id;
        sameChapter.manga.title[src] = chapter.manga.title;
      }
    }
    return intersiteChapters;
  }
}
