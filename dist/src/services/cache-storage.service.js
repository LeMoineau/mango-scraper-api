"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const default_values_1 = require("../config/default-values");
class CacheStorageService {
    constructor() {
        this.cache = {};
    }
    saveInCache(key, value, lifetimeInMs) {
        this.cache[key] = {
            value,
            expirationTime: new Date(new Date().getTime() + (lifetimeInMs !== null && lifetimeInMs !== void 0 ? lifetimeInMs : default_values_1.DefaultValues.LIFETIME)),
        };
    }
    saveInJsonInCache(jsonKey, key, value, lifetimeInMs) {
        let json = this.loadFromCache(jsonKey);
        if (!json) {
            json = {};
        }
        json[key] = value;
        this.saveInCache(jsonKey, json, lifetimeInMs);
    }
    isCached(key) {
        return this.cache[key] && this.cache[key].expirationTime >= new Date();
    }
    loadFromCache(key) {
        if (this.isCached(key)) {
            return this.cache[key].value;
        }
        delete this.cache[key];
        return;
    }
    loadFromJsonFromCache(keyJson, key) {
        const res = this.loadFromCache(keyJson);
        if (!res) {
            return;
        }
        return res[key];
    }
}
exports.default = new CacheStorageService();
