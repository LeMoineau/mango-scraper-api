import MangoApiConfigError from "../errors/MangoApiConfigError";
import Scraper from "../scrapers/scraper";
import { JsonObject } from "@services-common/types/primitives/jsonObject";
import mangoApiConfigJson from "./../../mango-api-config.json";
import { SourceName } from "@services-common/types/primitives/id";

class MangoApiConfig {
  private scrapersEnabled: { [src in SourceName]?: Scraper } = {};
  private trustedScrapers: { [index: number]: SourceName } = [];

  constructor() {
    this._verifyConfig(mangoApiConfigJson);
    for (let src of Object.keys(mangoApiConfigJson.scrapers) as SourceName[]) {
      const targetScraper = mangoApiConfigJson.scrapers[src];
      if (!targetScraper.enabled) {
        continue;
      }
      import(mangoApiConfigJson.scrapers[src].scraper).then((scraper) => {
        this.scrapersEnabled[src] = scraper.default;
      });
      this.trustedScrapers[targetScraper.trustLevel] = src;
    }
  }

  private _verifyConfig(config: JsonObject) {
    try {
      const trustLevels: number[] = [];
      for (let SourceName of Object.keys(config.scrapers)) {
        const targetScraper = config.scrapers[SourceName as SourceName];
        if (!targetScraper.enabled) {
          continue;
        }
        if (trustLevels.includes(targetScraper.trustLevel)) {
          throw new MangoApiConfigError(
            "same trustLevel for at least 2 of enabled scrapers"
          );
        }
        trustLevels.push(targetScraper.trustLevel);
      }
    } catch (err) {
      throw new MangoApiConfigError("config has not the right structure");
    }
  }

  /**
   * Get all enabled sources sort by trust level
   * @returns array of enabled source sort by trust level
   */
  public getEnabledSource(): SourceName[] {
    return Object.values(this.trustedScrapers).filter((e) => {
      return e.length > 0;
    });
  }

  public getScraperOfSrc(src: SourceName): Scraper {
    if (!this.scrapersEnabled[src]) {
      throw new MangoApiConfigError(`source "${src}" has no scraper`);
    }
    return this.scrapersEnabled[src]!;
  }
}

export default new MangoApiConfig();
