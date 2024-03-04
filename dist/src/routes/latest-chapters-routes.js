"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const latest_chapters_controller_1 = __importDefault(
  require("../controllers/latest-chapters-controller")
);
const routing_utils_1 = require("../utils/routing-utils");
const router = (0, express_1.Router)();
router.get("/", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const srcs = routing_utils_1.RoutingUtils.convertQueryParamToArray(
        req.query.srcs
      );
      try {
        if (srcs && !routing_utils_1.RoutingUtils.areValidSrcs(srcs)) {
          res.status(400).send("srcs must be valid source names");
          return;
        }
        res.send(
          yield latest_chapters_controller_1.default.get({ srcs: srcs && srcs })
        );
      } catch (err) {
        console.error(Object.keys(err));
        console.error(Object.keys(err.response));
        // console.error(err.request.rawHeaders);
        console.error(err.request._headers);
        // console.error(err.request.kHeaders);
        res.status(500).send(err);
      }
    } catch (err) {
      console.error(err);
      res.status(400).send("wrong parameter: srcs must be string array");
    }
  })
);
exports.default = router;
