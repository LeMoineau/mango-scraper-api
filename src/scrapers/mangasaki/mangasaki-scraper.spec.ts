import { describe, expect, it, vi } from "vitest";
import mangasakiScraper from "./mangasaki-scraper";
import { ScrapingUtils } from "../../utils/scraping-utils";
import { load } from "cheerio";
import {
  MANGASAKI_HOME_PAGE_HTML,
  MANGASAKI_ONE_PIECE_MANGA_PAGE_HTML,
} from "./__test-examples__/actual-mangasaki-page.spec";
import {
  MANGASAKI_HOME_RESULT_JSON,
  MANGASAKI_MANGA_ONE_PIECE_RESULT_JSON,
} from "./__test-examples__/mangasaki-json-response.spec";

describe("mangasaki-scraper", () => {
  describe("getLatestChapters", () => {
    it("should return correct json when getting latest chapters", async () => {
      vi.spyOn(ScrapingUtils, "requestToCheerioPage").mockResolvedValue(
        load(MANGASAKI_HOME_PAGE_HTML)
      );

      const chapters = await mangasakiScraper.getLatestChapters();

      expect(chapters).toStrictEqual(MANGASAKI_HOME_RESULT_JSON);
    });
  });

  describe("getManga", () => {
    it("should return correct json", async () => {
      const ONE_PIECE_MANGA_ID = "303936";
      vi.spyOn(ScrapingUtils, "requestToCheerioPage").mockResolvedValue(
        load(MANGASAKI_ONE_PIECE_MANGA_PAGE_HTML)
      );

      const chapters = await mangasakiScraper.getManga(ONE_PIECE_MANGA_ID);

      expect(chapters).toStrictEqual(MANGASAKI_MANGA_ONE_PIECE_RESULT_JSON);
    });
  });
});
