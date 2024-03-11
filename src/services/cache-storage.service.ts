import { DefaultValues } from "../config/default-values";

class CacheStorageService {
  private cache: { [key: string]: { value: any; expirationTime: Date } } = {};

  constructor() {}

  public saveInCache(key: string, value: any, lifetimeInMs?: number) {
    this.cache[key] = {
      value,
      expirationTime: new Date(
        new Date().getTime() + (lifetimeInMs ?? DefaultValues.LIFETIME)
      ),
    };
  }

  public saveInJsonInCache<T>(
    jsonKey: string,
    key: string,
    value: T,
    lifetimeInMs?: number
  ) {
    let json = this.loadFromCache(jsonKey);
    if (!json) {
      json = {};
    }
    json[key] = value;
    this.saveInCache(jsonKey, json, lifetimeInMs);
  }

  public isCached(key: string): boolean {
    return this.cache[key] && this.cache[key].expirationTime! >= new Date();
  }

  public loadFromCache(key: string): any | undefined {
    if (this.isCached(key)) {
      return this.cache[key].value;
    }
    delete this.cache[key];
    return;
  }

  public loadFromJsonFromCache<T>(keyJson: string, key: string): T | undefined {
    const res = this.loadFromCache(keyJson);
    if (!res) {
      return;
    }
    return res[key];
  }
}

export default new CacheStorageService();
