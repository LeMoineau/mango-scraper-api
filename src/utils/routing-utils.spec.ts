import { describe, expect, it } from "vitest";
import { RoutingUtils } from "./routing-utils";
import RoutingError from "../errors/RoutingError";

describe("RoutingUtils", () => {
  describe("convertQueryParamToArray", () => {
    it("should convert string query param into string array", () => {
      const A_QUERY_PARAM = "[1,2]";

      expect(
        RoutingUtils.convertQueryParamToArray(A_QUERY_PARAM)
      ).toStrictEqual([1, 2]);
    });

    it("should not change string array query param into another string array", () => {
      const A_QUERY_PARAM = [1, 2];

      expect(
        RoutingUtils.convertQueryParamToArray(A_QUERY_PARAM)
      ).toStrictEqual([1, 2]);
    });

    it("should throw RoutingError when converting wrong query param", () => {
      const A_QUERY_PARAM = "[1,2";

      expect(() =>
        RoutingUtils.convertQueryParamToArray(A_QUERY_PARAM)
      ).toThrow(RoutingError);
    });

    it("should return array when converting string query param", () => {
      const A_QUERY_PARAM = "a string";

      expect(
        RoutingUtils.convertQueryParamToArray(A_QUERY_PARAM)
      ).toStrictEqual(["a string"]);
    });

    it("should return empty array when converting undefined query param", () => {
      const A_QUERY_PARAM = undefined;

      expect(
        RoutingUtils.convertQueryParamToArray(A_QUERY_PARAM)
      ).toStrictEqual([]);
    });
  });

  describe("convertQueryParamToString", () => {
    it("should return string when converting a string query param", () => {
      const A_QUERY_PARAM = "a string";

      expect(RoutingUtils.convertQueryParamToString(A_QUERY_PARAM)).toBe(
        A_QUERY_PARAM
      );
    });

    it("should throw error when converting a not string query param", () => {
      const A_QUERY_PARAM = ["an array"];

      expect(() =>
        RoutingUtils.convertQueryParamToString(A_QUERY_PARAM)
      ).toThrow(RoutingError);
    });
  });

  describe("isValidSrc", () => {
    it("should return true if valid src", () => {});
    it("should return false if wrong src", () => {});
  });

  describe("areValidSrcs", () => {
    it("should return true if valid srcs", () => {});
    it("should return false if wrong srcs", () => {});
  });
});
