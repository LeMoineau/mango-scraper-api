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
const express_1 = require("express");
const routing_utils_1 = require("../../../shared/src/utils/routing-utils");
const Identifiers_1 = require("../../../shared/src/types/primitives/Identifiers");
const config_1 = __importDefault(require("../config/config"));
const scraper_controller_1 = __importDefault(require("../controllers/scraper.controller"));
const ChapterPage_1 = require("../../../shared/src/types/basics/ChapterPage");
const scraperRouter = (0, express_1.Router)();
scraperRouter.get("/:src/latestchapters", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const src = routing_utils_1.RoutingUtils.convertQueryParamToString(req.params.src);
        const syncWithBD = routing_utils_1.RoutingUtils.convertQueryParamToBoolean(req.query.syncWithBD);
        if (!(0, Identifiers_1.isSourceName)(src) || (src && !config_1.default.isValidSrc(src))) {
            res.status(400).send("src must be a valid source");
            return;
        }
        try {
            res.send(yield scraper_controller_1.default.getLatestChaptersOf(src, { syncWithBD }));
        }
        catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    }
    catch (error) {
        res
            .status(400)
            .send("wrong paramters: request params must contain src (SourceName)");
    }
}));
scraperRouter.post("/:src/mangas/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const src = routing_utils_1.RoutingUtils.convertQueryParamToString(req.params.src);
        const query = routing_utils_1.RoutingUtils.convertQueryParamToString(req.body.query);
        const syncWithBD = routing_utils_1.RoutingUtils.convertQueryParamToBoolean(req.body.syncWithBD);
        if (!(0, Identifiers_1.isSourceName)(src) || (src && !config_1.default.isValidSrc(src))) {
            res.status(400).send("src must be a valid source");
            return;
        }
        if (!query) {
            res.status(400).send("query must be defined for mangas serach");
            return;
        }
        try {
            res.send(yield scraper_controller_1.default.searchMangasOf(src, { query, syncWithBD }));
        }
        catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    }
    catch (error) {
        console.error(error);
        res
            .status(400)
            .send("wrong parameters: request params must contain src (SourceName)");
    }
}));
scraperRouter.get("/:src/mangas/:endpoint", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const src = routing_utils_1.RoutingUtils.convertQueryParamToString(req.params.src);
        const endpoint = routing_utils_1.RoutingUtils.convertQueryParamToString(req.params.endpoint);
        const syncWithBD = routing_utils_1.RoutingUtils.convertQueryParamToBoolean(req.query.syncWithBD);
        if (!(0, Identifiers_1.isSourceName)(src) || (src && !config_1.default.isValidSrc(src))) {
            res.status(400).send("src must be a valid source");
            return;
        }
        if (!endpoint) {
            res.status(400).send("endpoint params must be defined");
            return;
        }
        try {
            const manga = yield scraper_controller_1.default.getMangaOf(src, endpoint, {
                syncWithBD,
            });
            if (!manga) {
                res.status(404).send(`manga at endpoint "${endpoint}" not found`);
                return;
            }
            res.send(manga);
        }
        catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    }
    catch (error) {
        console.error(error);
        res
            .status(400)
            .send("wrong parameters: request params must contain src (SourceName)");
    }
}));
scraperRouter.get("/:src/mangas/:endpoint/chapters", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const src = routing_utils_1.RoutingUtils.convertQueryParamToString(req.params.src);
        const endpoint = routing_utils_1.RoutingUtils.convertQueryParamToString(req.params.endpoint);
        const syncWithBD = routing_utils_1.RoutingUtils.convertQueryParamToBoolean(req.query.syncWithBD);
        const pageNumber = routing_utils_1.RoutingUtils.convertQueryParamToNumber(req.query.page);
        const pageSize = routing_utils_1.RoutingUtils.convertQueryParamToNumber(req.query.limit);
        if (!(0, Identifiers_1.isSourceName)(src) || (src && !config_1.default.isValidSrc(src))) {
            res.status(400).send("src must be a valid source");
            return;
        }
        if (!endpoint) {
            res.status(400).send("endpoint params must be defined");
            return;
        }
        if (pageNumber !== undefined && pageNumber < 1) {
            res.status(400).send("page number must be at least 1");
            return;
        }
        try {
            const chapters = yield scraper_controller_1.default.getChaptersOfManga(src, endpoint, {
                syncWithBD,
                pageNumber: pageNumber !== null && pageNumber !== void 0 ? pageNumber : 1,
                pageSize,
            });
            if (!chapters) {
                res
                    .status(404)
                    .send(`no chapters found for manga at endpoint "${endpoint}"`);
                return;
            }
            res.send(chapters);
        }
        catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    }
    catch (error) {
        console.error(error);
        res
            .status(400)
            .send("wrong parameters: request params must contain src (SourceName)");
    }
}));
scraperRouter.get("/:src/chapters/:endpoint", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const src = routing_utils_1.RoutingUtils.convertQueryParamToString(req.params.src);
        const endpoint = routing_utils_1.RoutingUtils.convertQueryParamToString(req.params.endpoint);
        const syncWithBD = routing_utils_1.RoutingUtils.convertQueryParamToBoolean(req.query.syncWithBD);
        if (!(0, Identifiers_1.isSourceName)(src) || (src && !config_1.default.isValidSrc(src))) {
            res.status(400).send("src must be a valid source");
            return;
        }
        if (!endpoint) {
            res.status(400).send("endpoint params must be defined");
            return;
        }
        try {
            const chapter = yield scraper_controller_1.default.getChapterOf(src, endpoint, {
                syncWithBD,
            });
            if (!chapter) {
                res.status(404).send(`chapter at endpoint "${endpoint}" not found`);
                return;
            }
            res.send(chapter);
        }
        catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    }
    catch (error) {
        console.error(error);
        res
            .status(400)
            .send("wrong parameters: request params must contain src (SourceName)");
    }
}));
scraperRouter.post("/:src/generatePage", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const src = routing_utils_1.RoutingUtils.convertQueryParamToString(req.params.src);
        const chapterPage = req.body.page;
        if (!(0, Identifiers_1.isSourceName)(src) || (src && !config_1.default.isValidSrc(src))) {
            res.status(400).send("src must be a valid source");
            return;
        }
        if (!(0, ChapterPage_1.isChapterPage)(chapterPage)) {
            res.status(400).send("page must be a ChapterPage");
            return;
        }
        try {
            const page = yield scraper_controller_1.default.generatePageOf(src, chapterPage);
            if (!page) {
                res.status(404).send(`page not found at url "${chapterPage.url}"`);
            }
            res.send(page);
        }
        catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    }
    catch (error) {
        console.error(error);
        res
            .status(400)
            .send("wrong parameters: request params must contain src (SourceName)");
    }
}));
exports.default = scraperRouter;
