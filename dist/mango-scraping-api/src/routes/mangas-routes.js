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
const routing_utils_1 = require("./../../../shared/src/utils/routing-utils");
const config_1 = __importDefault(require("./../config/config"));
const mangasRouter = (0, express_1.Router)();
mangasRouter.post("/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = routing_utils_1.RoutingUtils.convertQueryParamToString(req.body.query);
        const srcs = routing_utils_1.RoutingUtils.convertQueryParamToArray(req.body.srcs);
        const syncWithBD = routing_utils_1.RoutingUtils.convertQueryParamToBoolean(req.body.syncWithBD);
        if (!query) {
            res.status(400).send("request must contains 'query' params");
            return;
        }
        if (srcs && !config_1.default.areValidSrcs(srcs)) {
            res.status(400).send("srcs must be valid and enabled sources");
            return;
        }
        try {
            res.send(yield mangas_controller_1.default.searchMangas({
                query,
                srcs: srcs,
                syncWithBD,
            }));
        }
        catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    }
    catch (error) {
        res
            .status(400)
            .send("/mangas request must contains 'query', 'srcs' or/and 'ids' params");
    }
}));
exports.default = mangasRouter;
