"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const routing_utils_1 = require("./routing-utils");
const RoutingError_1 = __importDefault(require("../errors/RoutingError"));
(0, vitest_1.describe)("RoutingUtils", () => {
    (0, vitest_1.describe)("convertQueryParamToArray", () => {
        (0, vitest_1.it)("should convert string query param into string array", () => {
            const A_QUERY_PARAM = "[1,2]";
            (0, vitest_1.expect)(routing_utils_1.RoutingUtils.convertQueryParamToArray(A_QUERY_PARAM)).toStrictEqual([1, 2]);
        });
        (0, vitest_1.it)("should not change string array query param into another string array", () => {
            const A_QUERY_PARAM = [1, 2];
            (0, vitest_1.expect)(routing_utils_1.RoutingUtils.convertQueryParamToArray(A_QUERY_PARAM)).toStrictEqual([1, 2]);
        });
        (0, vitest_1.it)("should throw RoutingError when converting wrong query param", () => {
            const A_QUERY_PARAM = "[1,2";
            (0, vitest_1.expect)(() => routing_utils_1.RoutingUtils.convertQueryParamToArray(A_QUERY_PARAM)).toThrow(RoutingError_1.default);
        });
        (0, vitest_1.it)("should return array when converting string query param", () => {
            const A_QUERY_PARAM = "a string";
            (0, vitest_1.expect)(routing_utils_1.RoutingUtils.convertQueryParamToArray(A_QUERY_PARAM)).toStrictEqual(["a string"]);
        });
        (0, vitest_1.it)("should return empty array when converting undefined query param", () => {
            const A_QUERY_PARAM = undefined;
            (0, vitest_1.expect)(routing_utils_1.RoutingUtils.convertQueryParamToArray(A_QUERY_PARAM)).toStrictEqual([]);
        });
    });
    (0, vitest_1.describe)("convertQueryParamToString", () => {
        (0, vitest_1.it)("should return string when converting a string query param", () => {
            const A_QUERY_PARAM = "a string";
            (0, vitest_1.expect)(routing_utils_1.RoutingUtils.convertQueryParamToString(A_QUERY_PARAM)).toBe(A_QUERY_PARAM);
        });
        (0, vitest_1.it)("should throw error when converting a not string query param", () => {
            const A_QUERY_PARAM = ["an array"];
            (0, vitest_1.expect)(() => routing_utils_1.RoutingUtils.convertQueryParamToString(A_QUERY_PARAM)).toThrow(RoutingError_1.default);
        });
    });
    (0, vitest_1.describe)("isValidSrc", () => {
        (0, vitest_1.it)("should return true if valid src", () => { });
        (0, vitest_1.it)("should return false if wrong src", () => { });
    });
    (0, vitest_1.describe)("areValidSrcs", () => {
        (0, vitest_1.it)("should return true if valid srcs", () => { });
        (0, vitest_1.it)("should return false if wrong srcs", () => { });
    });
    (0, vitest_1.describe)("tryCatchAndPrint", () => {
        (0, vitest_1.it)("should call tryCallback", () => {
            const A_TRY_CALLBACK = vitest_1.vi.fn();
            const A_CATCH_CALLBACK = vitest_1.vi.fn();
            routing_utils_1.RoutingUtils.tryCatchAndPrint(A_TRY_CALLBACK, A_CATCH_CALLBACK);
            (0, vitest_1.expect)(A_TRY_CALLBACK).toHaveBeenCalled();
        });
        (0, vitest_1.it)("should not call catchCallback if no error encounter", () => {
            const A_TRY_CALLBACK = vitest_1.vi.fn();
            const A_CATCH_CALLBACK = vitest_1.vi.fn();
            routing_utils_1.RoutingUtils.tryCatchAndPrint(A_TRY_CALLBACK, A_CATCH_CALLBACK);
            (0, vitest_1.expect)(A_CATCH_CALLBACK).not.toHaveBeenCalled();
        });
        (0, vitest_1.it)("should call catchCallback with error if error encounter during tryCallback", () => {
            const AN_ERROR = new Error("an error");
            const A_TRY_CALLBACK = () => {
                throw AN_ERROR;
            };
            const A_CATCH_CALLBACK = vitest_1.vi.fn();
            routing_utils_1.RoutingUtils.tryCatchAndPrint(A_TRY_CALLBACK, A_CATCH_CALLBACK);
            (0, vitest_1.expect)(A_CATCH_CALLBACK).toHaveBeenCalledWith(AN_ERROR);
        });
    });
});
