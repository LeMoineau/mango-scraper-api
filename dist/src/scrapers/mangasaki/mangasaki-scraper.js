"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
const scraping_utils_1 = require("../../utils/scraping-utils");
const array_utils_1 = require("../../utils/array-utils");
const mangasaki_utils_1 = require("./utils/mangasaki-utils");
const text_format_utils_1 = require("../../utils/text-format-utils");
class MangaSakiScraper {
  constructor() {
    var _a;
    this.PAGE_URL =
      (_a = process.env.MANGASAKI_URL) !== null && _a !== void 0
        ? _a
        : "https://www.mangasaki.org";
  }
  getLatestChapters() {
    return __awaiter(this, void 0, void 0, function* () {
      const $ = yield scraping_utils_1.ScrapingUtils.requestToCheerioPage(
        `https://www.mangasaki.org`
      );
      const chapters = [];
      $("ul#latest-list > li").each((i) => {
        const currentMangaPath = `ul#latest-list > li:nth-child(${i + 1})`;
        $(`${currentMangaPath} .item-list ul li .item-list ul li`).each((j) => {
          const currentChapterPath = `${currentMangaPath} .item-list ul li .item-list ul li:nth-child(${
            j + 1
          })`;
          try {
            chapters.push({
              image: $(`${currentMangaPath} a:first-child img`).attr("src"),
              manga: {
                title: $(
                  `${currentMangaPath} .item-list ul li .tl a strong`
                ).text(),
                id: array_utils_1.ArrayUtils.getLastOf(
                  $(`${currentMangaPath} .item-list ul li .tl a`)
                    .attr("href")
                    .split("/")
                ),
              },
              number: array_utils_1.ArrayUtils.getLastOf(
                $(`${currentChapterPath} a`).text().split(" ")
              ),
              title: $(`${currentChapterPath} a`).text(),
              id: array_utils_1.ArrayUtils.getLastOf(
                $(`${currentChapterPath} a`).attr("href").split("/")
              ),
              releaseDate:
                mangasaki_utils_1.MangasakiUtils.calculateDateFromString(
                  $(`${currentChapterPath} .tm`).text()
                ),
            });
          } catch (e) {}
        });
      });
      return chapters;
    });
  }
  getMangas({ q }) {
    return __awaiter(this, void 0, void 0, function* () {
      const $ = yield scraping_utils_1.ScrapingUtils.requestToCheerioPage(
        `${this.PAGE_URL}/search/node/${q}`
      );
      let searchRes = [];
      $(".search-results li").each((i) => {
        searchRes.push(
          array_utils_1.ArrayUtils.getLastOf(
            $(`.search-results li:nth-child(${i + 1}) a`)
              .attr("href")
              .split("/")
          )
        );
      });
      let mangas = [];
      for (let res of searchRes) {
        const manga = yield this.getManga(res);
        mangas.push({
          id: manga.id,
          name: manga.name,
          author: manga.author,
          image: manga.image,
        });
      }
      return mangas;
    });
  }
  getManga(id) {
    return __awaiter(this, void 0, void 0, function* () {
      let $;
      if (text_format_utils_1.TextFormatUtils.isNumber(id)) {
        $ = yield scraping_utils_1.ScrapingUtils.requestToCheerioPage(
          `${this.PAGE_URL}/node/${id}`
        );
      } else {
        $ = yield scraping_utils_1.ScrapingUtils.requestToCheerioPage(
          `${this.PAGE_URL}/manga/${id}`
        );
      }
      const mangaTitle = $("div#main .title").text();
      let chapters = [];
      $("div#main .node-manga table tbody tr").each((i) => {
        const currentChapterPath = `div#main .node-manga table tbody tr:nth-child(${
          i + 1
        })`;
        chapters.push({
          id: array_utils_1.ArrayUtils.getLastOf(
            $(`${currentChapterPath} a`).attr("href").split("/")
          ),
          number: text_format_utils_1.TextFormatUtils.stringWithout(
            $(`${currentChapterPath} a`).text(),
            mangaTitle
          ),
          title: $(`${currentChapterPath} a`).text(),
          releaseDate: new Date(
            $(`${currentChapterPath} td:nth-child(2)`).text()
          ),
        });
      });
      const urlFirstChapter = $(
        `div#main .node-manga table tbody tr:nth-child(1) a`
      ).attr("href");
      if (urlFirstChapter) {
        const $2 = yield scraping_utils_1.ScrapingUtils.requestToCheerioPage(
          `${this.PAGE_URL}/${urlFirstChapter}`
        );
        $2("select#edit-select-node option").each((i) => {
          const currentChapter = $2(
            `select#edit-select-node option:nth-child(${i + 1})`
          );
          const chapterNumber =
            text_format_utils_1.TextFormatUtils.stringWithout(
              $(currentChapter).text(),
              mangaTitle
            );
          const sameChapter = chapters.find((c) => c.number === chapterNumber);
          if (!sameChapter) {
            chapters.push({
              id: $(currentChapter).attr("value"),
              number: chapterNumber,
              title: $(currentChapter).text(),
            });
          }
        });
      }
      return {
        id: id,
        name: mangaTitle,
        author: $(
          ".node-manga .content .field:nth-child(4) .field-item"
        ).text(),
        image: $(".node-manga .content .field:nth-child(1) img").attr("src"),
        chapters,
      };
    });
  }
  getChapterPages(_, chapterId) {
    return __awaiter(this, void 0, void 0, function* () {
      let $;
      if (text_format_utils_1.TextFormatUtils.isNumber(chapterId)) {
        $ = yield scraping_utils_1.ScrapingUtils.requestToCheerioPage(
          `${this.PAGE_URL}/node/${chapterId}`
        );
      } else {
        $ = yield scraping_utils_1.ScrapingUtils.requestToCheerioPage(
          `${this.PAGE_URL}/chapter/${chapterId}`
        );
      }
      let pages = $.html()
        .split(`,"showmanga":{"paths":["`)[1]
        .split(`"],"count_p":`)[0]
        .split('","');
      pages.splice(1, 1);
      return {
        pages: pages.map((p) => {
          return { url: p };
        }),
      };
    });
  }
}
exports.default = new MangaSakiScraper();
