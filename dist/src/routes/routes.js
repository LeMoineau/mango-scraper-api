"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const latest_chapters_routes_1 = __importDefault(
  require("./latest-chapters-routes")
);
const mangas_routes_1 = __importDefault(require("./mangas-routes"));
const settings_routes_1 = __importDefault(require("./settings-routes"));
const router = (0, express_1.Router)();
router.get("/", (_, res) => {
  const fs = require("fs");
  let f = [];
  let node_modules = [];
  fs.readdir(`${__dirname}/../../../`, (err, files) => {
    files.forEach((file) => {
      f.push(file);
    });
    fs.readdir(`${__dirname}/../../../node_modules`, (err, files) => {
      files.forEach((file) => {
        node_modules.push(file);
      });
      fs.readFile(`${__dirname}/../../../package.json`, "utf8", (err, data) => {
        if (err) throw err;
        res.send({
          msg: "Mango-api ready!",
          files: f,
          node_modules: node_modules,
          packagejson: data,
        });
      });
    });
  });
});
router.use("/latestchapters", latest_chapters_routes_1.default);
router.use("/mangas", mangas_routes_1.default);
router.use("/settings", settings_routes_1.default);
exports.default = router;
