import MangoApiConfigError from "../errors/MangoApiConfigError";
import Scraper from "../scrapers/scraper";
import { JsonObject } from "@shared/types/primitives/jsonObject";
import mangoApiConfigJson from "./../../mango-api-config.json";
import { ArrayUtils } from "./../../../shared/src/utils/array-utils";
import { Env } from "./../types/Env";
import { SourceName } from "../../../shared/src/types/primitives/Identifiers";

class MangoApiConfig {
  private scrapersEnabled: { [src: SourceName]: Scraper } = {};
  private trustedScrapers: { [index: number]: SourceName } = [];

  constructor() {
    this._verifyConfig(mangoApiConfigJson);
    for (let [src, scraper] of Object.entries(mangoApiConfigJson.scrapers)) {
      if (!scraper.enabled) {
        continue;
      }
      import(scraper.scraper).then((scraper) => {
        this.scrapersEnabled[src] = scraper.default;
      });
      this.trustedScrapers[scraper.trustLevel] = src;
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

  public isValidSrc(querySrc: string): boolean {
    return this.getEnabledSource().includes(querySrc as SourceName);
  }

  public areValidSrcs(querySrcs: string[]): boolean {
    return ArrayUtils.includesAll(this.getEnabledSource(), querySrcs);
  }

  public getEnv(): Env {
    return {
      MANGO_BD_API_URL: process.env.MANGO_BD_API_URL!,
      MANGAPLUS_API_ENDPOINT: process.env.MANGAPLUS_API_ENDPOINT!,
      MANGASAKI_URL: process.env.MANGASAKI_URL!,
      SAILMG_URL: process.env.SAILMG_URL!,
    };
  }
}

export default new MangoApiConfig();
