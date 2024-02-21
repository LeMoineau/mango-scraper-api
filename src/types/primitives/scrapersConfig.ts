import Scraper from "../../scrapers/scraper";

export type SourceName = "mangaplus" | "mangasaki";

export interface ScraperConfig {
  enabled: boolean;
  trustLevel: number;
  scraper: Scraper;
}

export interface ScrapersConfig {
  scrapers: { [src in SourceName]: ScraperConfig };
}
