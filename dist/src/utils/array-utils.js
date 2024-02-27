"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayUtils = void 0;
const SplittingError_1 = __importDefault(require("../errors/SplittingError"));
var ArrayUtils;
(function (ArrayUtils) {
    function getLastOf(arr) {
        return arr[arr.length - 1];
    }
    ArrayUtils.getLastOf = getLastOf;
    /**
     * Try to split and get the n-element but return return the src if dont succeed
     * Can throw SplittingError instead of returning src in error case
     * @param arr
     * @param splitter
     * @param n
     * @param throwError
     * @returns n-element of src if error or SplittingError if throwError true
     */
    function tryingSplitAndGet(arr, splitter, n = 1, throwError = false) {
        const res = arr.split(splitter)[n];
        if (res) {
            return res;
        }
        if (!res && !throwError) {
            return arr;
        }
        throw new SplittingError_1.default(arr, splitter);
    }
    ArrayUtils.tryingSplitAndGet = tryingSplitAndGet;
    /**
     * Transform each item of an array<A> into an array<B>
     * @param array source array<A> from where change items
     * @param transformater function which transform an item of type A to type B
     * @returns result array<B>
     */
    function transformEachItemOf(array, transformater) {
        let res = [];
        for (let item of array) {
            const transform = transformater(item);
            if (transform)
                res.push(transform);
        }
        return res;
    }
    ArrayUtils.transformEachItemOf = transformEachItemOf;
    /**
     * Check if target array include all items of src array
     * @param src
     * @param target
     * @returns true if target contains all src items, false else
     */
    function includesAll(src, target) {
        for (let t of target) {
            if (!src.includes(t))
                return false;
        }
        return true;
    }
    ArrayUtils.includesAll = includesAll;
})(ArrayUtils || (exports.ArrayUtils = ArrayUtils = {}));
