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
const mangas_controller_1 = __importDefault(require("../controllers/mangas-controller"));
const routing_utils_1 = require("../utils/routing-utils");
const router = (0, express_1.Router)();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = routing_utils_1.RoutingUtils.convertQueryParamToString(req.query.query);
        const srcs = routing_utils_1.RoutingUtils.convertQueryParamToArray(req.query.srcs);
        const ids = routing_utils_1.RoutingUtils.convertQueryParamToArray(req.query.ids);
        if (!query || (!ids && !srcs)) {
            res
                .status(400)
                .send("/mangas request must contains 'query', 'srcs' or/and 'ids' params");
            return;
        }
        if (ids && srcs && ids.length > 0 && srcs.length !== ids.length) {
            res
                .status(400)
                .send("when ids is specified, srcs and ids array must have the same size");
            return;
        }
        if (srcs && !routing_utils_1.RoutingUtils.areValidSrcs(srcs)) {
            res.status(400).send("srcs must be valid source names");
            return;
        }
        console.log("srcs", srcs);
        try {
            res.send(yield mangas_controller_1.default.getAll({
                query,
                srcs: srcs && srcs,
                ids,
            }));
        }
        catch (error) {
            console.error(error);
            res.status(500).send("server error");
        }
    }
    catch (error) {
        res
            .status(400)
            .send("/mangas request must contains 'query', 'srcs' or/and 'ids' params");
    }
}));
router.get("/:formattedName", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const formattedName = routing_utils_1.RoutingUtils.convertQueryParamToString(req.params.formattedName);
        try {
            const srcs = routing_utils_1.RoutingUtils.convertQueryParamToArray(req.query.srcs);
            const dontDigIn = routing_utils_1.RoutingUtils.convertQueryParamToBoolean(req.query.dontDigIn);
            try {
                if (srcs && !routing_utils_1.RoutingUtils.areValidSrcs(srcs)) {
                    res.status(400).send("srcs must be valid src");
                    return;
                }
                const manga = yield mangas_controller_1.default.get({
                    formattedName,
                    srcs: srcs && srcs,
                    dontDigIn,
                });
                if (!manga) {
                    res
                        .status(404)
                        .send(`manga not found. Try making a global search at /mangas?query=YOUR_MANGA`);
                    return;
                }
                res.send(manga);
            }
            catch (error) {
                console.error(error);
                res.status(500).send("server error");
            }
        }
        catch (err) {
            console.error(err);
            res
                .status(400)
                .send("query parameters possible are srcs (SourceName[]) and dontDigIn (boolean)");
        }
    }
    catch (err) {
        console.error(err);
        res.status(400).send("formattedName must be a string");
    }
}));
router.get("/:formattedName/chapters/:src/:chapterId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const formattedName = routing_utils_1.RoutingUtils.convertQueryParamToString(req.params.formattedName);
        const src = routing_utils_1.RoutingUtils.convertQueryParamToString(req.params.src);
        const chapterId = routing_utils_1.RoutingUtils.convertQueryParamToString(req.params.chapterId);
        if (src && !routing_utils_1.RoutingUtils.isValidSrc(src)) {
            res.status(400).send("source must be a valid source name");
            return;
        }
        try {
            res.send(yield mangas_controller_1.default.getChapterPages(src, formattedName, chapterId));
        }
        catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    }
    catch (err) {
        res
            .status(400)
            .send("wrong arguments: formattedName, src and chapterId must be string");
    }
}));
exports.default = router;
