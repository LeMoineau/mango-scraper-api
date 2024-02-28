"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const settings_controller_1 = __importDefault(require("./settings-controller"));
const config_1 = __importDefault(require("../config/config"));
(0, vitest_1.describe)("settings-controller", () => {
    (0, vitest_1.describe)("get", () => {
        (0, vitest_1.it)("should return source enabled when getting config", () => {
            const ENABLED_SOURCES = ["mangaplus", "mangasaki"];
            vitest_1.vi.spyOn(config_1.default, "getEnabledSource").mockReturnValue(ENABLED_SOURCES);
            const res = settings_controller_1.default.get();
            (0, vitest_1.expect)(res.scrapersEnabled).toStrictEqual(ENABLED_SOURCES);
        });
    });
});
