"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MangoApiConfigError_1 = __importDefault(require("../errors/MangoApiConfigError"));
const mango_api_config_json_1 = __importDefault(require("./../../mango-api-config.json"));
const array_utils_1 = require("./../../../shared/src/utils/array-utils");
class MangoApiConfig {
    constructor() {
        this.scrapersEnabled = {};
        this.trustedScrapers = [];
        this._verifyConfig(mango_api_config_json_1.default);
        for (let [src, scraper] of Object.entries(mango_api_config_json_1.default.scrapers)) {
            if (!scraper.enabled) {
                continue;
            }
            Promise.resolve(`${scraper.scraper}`).then(s => __importStar(require(s))).then((scraper) => {
                this.scrapersEnabled[src] = scraper.default;
            });
            this.trustedScrapers[scraper.trustLevel] = src;
        }
    }
    _verifyConfig(config) {
        try {
            const trustLevels = [];
            for (let SourceName of Object.keys(config.scrapers)) {
                const targetScraper = config.scrapers[SourceName];
                if (!targetScraper.enabled) {
                    continue;
                }
                if (trustLevels.includes(targetScraper.trustLevel)) {
                    throw new MangoApiConfigError_1.default("same trustLevel for at least 2 of enabled scrapers");
                }
                trustLevels.push(targetScraper.trustLevel);
            }
        }
        catch (err) {
            throw new MangoApiConfigError_1.default("config has not the right structure");
        }
    }
    /**
     * Get all enabled sources sort by trust level
     * @returns array of enabled source sort by trust level
     */
    getEnabledSource() {
        return Object.values(this.trustedScrapers).filter((e) => {
            return e.length > 0;
        });
    }
    getScraperOfSrc(src) {
        if (!this.scrapersEnabled[src]) {
            throw new MangoApiConfigError_1.default(`source "${src}" has no scraper`);
        }
        return this.scrapersEnabled[src];
    }
    isValidSrc(querySrc) {
        return this.getEnabledSource().includes(querySrc);
    }
    areValidSrcs(querySrcs) {
        return array_utils_1.ArrayUtils.includesAll(this.getEnabledSource(), querySrcs);
    }
    getEnv() {
        return {
            MANGO_BD_API_URL: process.env.MANGO_BD_API_URL,
            MANGAPLUS_API_ENDPOINT: process.env.MANGAPLUS_API_ENDPOINT,
            MANGASAKI_URL: process.env.MANGASAKI_URL,
            SAILMG_URL: process.env.SAILMG_URL,
        };
    }
}
exports.default = new MangoApiConfig();
