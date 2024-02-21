class CacheStorageService {
  private DEFAULT_LIFETIME = 60000; // 1min
  private cache: { [key: string]: { value: any; expirationTime: Date } } = {};

  constructor() {}

  public saveInCache(key: string, value: any, lifetimeInMs?: number) {
    this.cache[key] = {
      value,
      expirationTime: new Date(
        new Date().getTime() + (lifetimeInMs ?? this.DEFAULT_LIFETIME)
      ),
    };
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
}

export default new CacheStorageService();
