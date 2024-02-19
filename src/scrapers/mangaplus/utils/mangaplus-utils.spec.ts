import { beforeAll, describe, expect, it, vi } from "vitest";
import { ProtoManaging } from "../../../utils/proto-managing";
import { Type } from "protobufjs";
import { exampleWeb_homeV3Json } from "../test-examples/correct-response-example.spec";
import { MangaplusUtils } from "./mangaplus-utils";
import mangaplusScraper from "../mangaplus-scraper";

describe("mangaplus-utils", () => {
  const A_Uint8Array: Uint8Array = {} as Uint8Array;
  const A_TYPE: Type = {} as Type;
  const A_CORRECT_JSON: { [key: string]: any } = exampleWeb_homeV3Json;

  beforeAll(() => {
    vi.spyOn(ProtoManaging, "httpGetProtoFile").mockResolvedValue(A_Uint8Array);
    vi.spyOn(ProtoManaging, "loadProtoFileAsync").mockResolvedValue(A_TYPE);
    vi.spyOn(ProtoManaging, "decodeToJson").mockReturnValue(A_CORRECT_JSON);
  });

  it("should call ProtoManaging httpGetProtoFile with correct endpoint when get all chapters", async () => {
    await MangaplusUtils.decodeJsonFromMangaPlusRequest(
      `${mangaplusScraper["API_ENDPOINT"]}/web/web_homeV3?lang=eng`,
      `${__dirname}/protos/web_homeV3.proto`,
      "mangaplus.Web_homeV3"
    );

    expect(ProtoManaging.httpGetProtoFile).toHaveBeenCalledWith(
      `${mangaplusScraper["API_ENDPOINT"]}/web/web_homeV3?lang=eng`
    );
  });

  it("should call ProtoManaging loadProtoFileAsync when get all chapters", async () => {
    await MangaplusUtils.decodeJsonFromMangaPlusRequest(
      `${mangaplusScraper["API_ENDPOINT"]}/web/web_homeV3?lang=eng`,
      `${__dirname}/protos/web_homeV3.proto`,
      "mangaplus.Web_homeV3"
    );

    expect(ProtoManaging.loadProtoFileAsync).toHaveBeenCalled();
  });

  it("should call decodeToJson when getting all chapters", async () => {
    await MangaplusUtils.decodeJsonFromMangaPlusRequest(
      `${mangaplusScraper["API_ENDPOINT"]}/web/web_homeV3?lang=eng`,
      `${__dirname}/protos/web_homeV3.proto`,
      "mangaplus.Web_homeV3"
    );

    expect(ProtoManaging.decodeToJson).toHaveBeenCalled();
  });
});
