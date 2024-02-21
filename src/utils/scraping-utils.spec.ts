import { beforeEach, describe, expect, it, vi } from "vitest";
import { ScrapingUtils } from "./scraping-utils";
import { ScrapersConfig } from "../types/primitives/scrapersConfig";
import mangaplusScraper from "../scrapers/mangaplus/mangaplus-scraper";
import axios from "axios";
import * as cheerio from "cheerio";

// vi.mock("cheerio", () => {
//   return {
//     load: vi.fn(),
//   };
// });

describe("scraping-utils", () => {
  let A_CORRECT_CONFIG: ScrapersConfig;
  const AN_URL: string = "an url";
  const AN_AXIOS_RESPONSE = { data: "data" };
  const A_CHEERIO_NODE: cheerio.Cheerio<any> = {
    text: vi.fn(),
    attr: vi.fn(),
  } as unknown as cheerio.Cheerio<any>;
  const AN_UNKNOWN_METHOD = "a method";

  beforeEach(() => {
    A_CORRECT_CONFIG = {
      scrapers: {
        mangaplus: {
          enabled: true,
          trustLevel: 1,
          scraper: mangaplusScraper,
        },
        mangasaki: {
          enabled: true,
          trustLevel: 2,
          scraper: mangaplusScraper,
        },
      },
    };
  });

  it("should call correct axios get when request to cheerio", async () => {
    vi.spyOn(axios, "get").mockResolvedValue({ data: "" });

    await ScrapingUtils.requestToCheerioPage(AN_URL);

    expect(axios.get).toHaveBeenCalledWith(AN_URL);
  });

  it("should call cheerio load when request to cheerio", async () => {
    vi.spyOn(axios, "get").mockResolvedValue(AN_AXIOS_RESPONSE);

    await ScrapingUtils.requestToCheerioPage(AN_URL);

    expect(cheerio.load).toHaveBeenCalledWith(AN_AXIOS_RESPONSE.data);
  });
});
