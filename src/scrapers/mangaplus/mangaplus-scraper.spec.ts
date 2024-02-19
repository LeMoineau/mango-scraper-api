import { beforeAll, describe, expect, it, vi } from "vitest";
import {
  exampleFinalMangaPlusChaptersJson,
  exampleWeb_homeV3Json,
} from "./test-examples/correct-response-example.spec";
import mangaPlusScraper from "./mangaplus-scraper";
import { MangaplusUtils } from "./utils/mangaplus-utils";

describe("mangaplus-scraper", () => {
  const A_CORRECT_JSON: { [key: string]: any } = exampleWeb_homeV3Json;
  const A_MANGA_ID = "123";

  beforeAll(() => {
    vi.spyOn(
      MangaplusUtils,
      "decodeJsonFromMangaPlusRequest"
    ).mockResolvedValue(A_CORRECT_JSON);
  });

  it("should call decodeJsonFromMangaPlusRequest with correct args when get all chapters", async () => {
    await mangaPlusScraper.getLatestChapters();

    expect(MangaplusUtils.decodeJsonFromMangaPlusRequest).toHaveBeenCalledWith(
      `${mangaPlusScraper["API_ENDPOINT"]}/web/web_homeV3?lang=eng`,
      `${__dirname}/protos/web_homeV3.proto`,
      "mangaplus.Web_homeV3"
    );
  });

  it("should return correct chapters json when getting all chapters", async () => {
    const chapters = await mangaPlusScraper.getLatestChapters();

    expect(chapters).toStrictEqual(exampleFinalMangaPlusChaptersJson);
  });

  it("should call decodeJsonFromMangaPlusRequest with correct args when getting manga infos", async () => {
    await mangaPlusScraper.getManga(A_MANGA_ID);

    expect(MangaplusUtils.decodeJsonFromMangaPlusRequest).toHaveBeenCalledWith(
      `${mangaPlusScraper["API_ENDPOINT"]}/title_detailV2?title_id=${A_MANGA_ID}`,
      `${__dirname}/protos/title_detailV2.proto`,
      "mangaplus.Title_detailV2"
    );
  });
});
