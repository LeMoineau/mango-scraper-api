"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutingUtils = void 0;
const RoutingError_1 = __importDefault(require("../errors/RoutingError"));
var RoutingUtils;
(function (RoutingUtils) {
    /**
     * Convert a query param to string array of undefined if not defined
     * @param queryParam targeted query param
     * @throws RoutingError if cannot convert query param to array
     * @returns the string array or undefined if query param not defined
     */
    function convertQueryParamToArray(queryParam) {
        try {
            if (queryParam) {
                let srcs = [];
                if (Array.isArray(queryParam)) {
                    srcs = queryParam;
                }
                else if (typeof queryParam === "string") {
                    srcs = [queryParam];
                }
                else {
                    srcs = JSON.parse(queryParam);
                }
                return srcs;
            }
            return;
        }
        catch (_a) {
            throw new RoutingError_1.default(`cannot convert "${queryParam}" to array`);
        }
    }
    RoutingUtils.convertQueryParamToArray = convertQueryParamToArray;
    /**
     * Convert a query param to string or undefined if not defined
     * @param queryParam targeted query param
     * @throws RoutingError if query param is not a string
     * @returns the string or undefined if query param not defined
     */
    function convertQueryParamToString(queryParam) {
        if (!queryParam) {
            return;
        }
        if (typeof queryParam === "string") {
            return queryParam;
        }
        throw new RoutingError_1.default(`"${queryParam}" is not a string`);
    }
    RoutingUtils.convertQueryParamToString = convertQueryParamToString;
    /**
     * Convert a query param to boolean or undefined if not defined
     * @param queryParam targeted query param
     * @throws RoutingError if query param is not a boolean
     * @returns the boolean or undefined if query param not defined
     */
    function convertQueryParamToBoolean(queryParam) {
        if (!queryParam) {
            return;
        }
        if (typeof queryParam === "boolean") {
            return queryParam;
        }
        if (typeof queryParam === "string") {
            return queryParam.toLowerCase() === "true";
        }
        throw new RoutingError_1.default(`"${queryParam}" is not a boolean`);
    }
    RoutingUtils.convertQueryParamToBoolean = convertQueryParamToBoolean;
    /**
     * Convert a query param to number or undefined if not defined
     * @param queryParam targeted query param
     * @throws RoutingError if query param is not a boolean
     * @returns the number or undefined if query param not defined
     */
    function convertQueryParamToNumber(queryParam) {
        try {
            const res = Number(queryParam);
            return isNaN(res) ? undefined : res;
        }
        catch (err) {
            throw new RoutingError_1.default(`"${queryParam}" is not a number`);
        }
    }
    RoutingUtils.convertQueryParamToNumber = convertQueryParamToNumber;
    function tryCatchAndPrint(tryCallback, catchCallback, dontLogError) {
        try {
            tryCallback();
        }
        catch (error) {
            if (!dontLogError)
                console.error(error);
            catchCallback(error);
        }
    }
    RoutingUtils.tryCatchAndPrint = tryCatchAndPrint;
})(RoutingUtils || (exports.RoutingUtils = RoutingUtils = {}));
