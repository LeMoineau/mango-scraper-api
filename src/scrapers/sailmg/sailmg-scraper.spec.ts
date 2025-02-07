import { describe, expect, it, vi } from "vitest";
import { ScrapingUtils } from "../../utils/scraping-utils";
import { load } from "cheerio";
import sailMgScraper from "./sailmg-scraper";
import {
  SAILMG_LATESTCHAPTER_PAGE_HTML,
  SAILMG_MANGA_PAGE_HTML,
  SAILMG_MANGA_SEARCH_PAGE_HTML,
} from "./__test-examples__/actual-sailmg-page.spec";
import {
  SAILMG_LATESTCHAPTER_RESULT_JSON,
  SAILMG_MANGA_RESULT_JSON,
  SAILMG_MANGA_SEARCH_RESULT_JSON,
} from "./__test-examples__/sailmg-json-response.spec";
import sailmgScraper from "./sailmg-scraper";

describe("mangasaki-scraper", () => {
  describe("getLatestChapters", () => {
    it("should return correct json when getting latest chapters", async () => {
      vi.spyOn(ScrapingUtils, "requestToCheerioPage").mockResolvedValue(
        load(SAILMG_LATESTCHAPTER_PAGE_HTML)
      );

      const chapters = await sailMgScraper.getLatestChapters();

      expect(chapters).toStrictEqual(SAILMG_LATESTCHAPTER_RESULT_JSON);
    });
  });

  describe("getManga", () => {
    it("should return correct json", async () => {
      const A_MANGA_ENDPOINT = "dark-magician-transmigrates-after-66666-years";
      vi.spyOn(ScrapingUtils, "requestToCheerioPage").mockResolvedValue(
        load(SAILMG_MANGA_PAGE_HTML)
      );

      const manga = await sailmgScraper.getManga(A_MANGA_ENDPOINT);

      expect(manga).toStrictEqual(SAILMG_MANGA_RESULT_JSON);
    });
  });

  describe("search manga", () => {
    it("should return correct json", async () => {
      const A_MANGA_QUERY = "naruto";
      vi.spyOn(ScrapingUtils, "requestToCheerioPage").mockResolvedValue(
        load(SAILMG_MANGA_SEARCH_PAGE_HTML)
      );

      const mangas = await sailmgScraper.searchMangas({ q: A_MANGA_QUERY });

      expect(mangas).toStrictEqual(SAILMG_MANGA_SEARCH_RESULT_JSON);
    });
  });

  // describe("getChapterPages", () => {
  //   it("should return correct json", async () => {
  //     const ONE_PIECE_MANGA_ID = "303936";
  //     const ONE_PIECE_CHAPTER_ID = "one-piece-1108";
  //     vi.spyOn(ScrapingUtils, "requestToCheerioPage").mockResolvedValue(
  //       load(MANGASAKI_ONE_PIECE_CHAPTER_PAGE_HTML)
  //     );

  //     const chapters = await sailmgScraper.getChapterPages(
  //       ONE_PIECE_MANGA_ID,
  //       ONE_PIECE_CHAPTER_ID
  //     );

  //     expect(chapters).toStrictEqual(MANGASAKI_CHAPTER_ONE_PIECE_RESULT_JSON);
  //   });
  // });
});
