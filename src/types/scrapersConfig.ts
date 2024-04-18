import { SourceName } from "@shared/types/primitives/Identifiers";
import Scraper from "../scrapers/scraper";

export interface ScraperConfig {
  enabled: boolean;
  trustLevel: number;
  scraper: Scraper;
}

export interface ScrapersConfig {
  scrapers: { [src in SourceName]: ScraperConfig };
}
