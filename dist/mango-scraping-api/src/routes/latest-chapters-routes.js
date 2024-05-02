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
const routing_utils_1 = require("./../../../shared/src/utils/routing-utils");
const config_1 = __importDefault(require("./../config/config"));
const latest_chapters_controller_1 = __importDefault(require("../controllers/latest-chapters-controller"));
const latestChaptersRouter = (0, express_1.Router)();
latestChaptersRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const srcs = routing_utils_1.RoutingUtils.convertQueryParamToArray(req.query.srcs);
        const syncWithBD = routing_utils_1.RoutingUtils.convertQueryParamToBoolean(req.query.syncWithBD);
        try {
            if (srcs && !config_1.default.areValidSrcs(srcs)) {
                res.status(400).send("srcs must be valid source names");
                return;
            }
            res.send(yield latest_chapters_controller_1.default.getAll({
                srcs: srcs && srcs,
                syncWithBD,
            }));
        }
        catch (error) {
            console.error(error);
            res.status(500).send("server error");
        }
    }
    catch (err) {
        console.error(err);
        res.status(400).send("wrong parameter: srcs must be string array");
    }
}));
exports.default = latestChaptersRouter;
