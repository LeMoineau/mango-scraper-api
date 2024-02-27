"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config/config"));
const formatted_name_service_1 = __importDefault(require("../services/formatted-name.service"));
const intersite_utils_1 = require("../utils/intersite-utils");
class LatestChaptersController {
    constructor() { }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            const chaptersBySrc = {};
            for (let src of config_1.default.getEnabledSource()) {
                const chapters = yield config_1.default.getScraperOfSrc(src).getLatestChapters();
                chaptersBySrc[src] = chapters;
            }
            const intersiteChapters = intersite_utils_1.IntersiteUtils.convertChaptersToIntersiteChapters(chaptersBySrc);
            formatted_name_service_1.default.saveFormattedNamesFromLatestChapters(intersiteChapters);
            return intersiteChapters;
        });
    }
}
exports.default = new LatestChaptersController();
