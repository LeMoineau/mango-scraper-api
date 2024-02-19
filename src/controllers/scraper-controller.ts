import scrapersConfig from "../config/scrapers-config";
import Scraper from "../scrapers/scraper";
import { ObjectUtils } from "../utils/object-utils";
import { TextFormatUtils } from "../utils/text-format-utils";
import IntersiteChapter from "../types/intersite/IntersiteChapter";
import Chapter from "../types/chapter";
import { ScraperName, ScrapersConfig } from "../config/scrapersConfig";

class ScraperController {
  private scrapersEnabled: { [scraperName in ScraperName]: Scraper } = {};
  private trustedScrapers: { [index: number]: ScraperName } = [];

  constructor(options: ScrapersConfig) {
    for (let scraperName of Object.keys(options.scrapers)) {
      const targetScraper = options.scrapers[scraperName];
      if (!targetScraper.enabled) {
        continue;
      }
      this.scrapersEnabled[scraperName] = targetScraper.scraper;
      this.trustedScrapers[targetScraper.trustLevel] = scraperName;
    }
  }

  public async getLatestChaptersOfAllScrapers(): Promise<IntersiteChapter[]> {
    const chapters: IntersiteChapter[] = [];
    await ObjectUtils.forEachKeyInObject(
      this.scrapersEnabled,
      async (scraperName, scraper) => {
        const scraperChapters = await scraper.getLatestChapters();
        this.appendChapterToIntersiteChapters(
          chapters,
          scraperChapters,
          scraperName
        );
      }
    );
    return chapters;
  }

  private appendChapterToIntersiteChapters(
    intersiteChapters: IntersiteChapter[],
    chaptersToAppend: Chapter[],
    scraperName: string
  ) {
    for (let c of chaptersToAppend) {
      let sameChapter = intersiteChapters.find((ic) =>
        this.findSameChapterFromDifferentSrc(ic, c)
      );
      if (!sameChapter) {
        sameChapter = {
          title: {
            [scraperName]: c.title,
          },
          number: {
            [scraperName]: c.number,
          },
          formattedNumber: TextFormatUtils.formatChapterNumber(c.number),
          image: {
            [scraperName]: c.image,
          },
          date: {
            [scraperName]: c.releaseDate,
          },
          id: {
            [scraperName]: c.id,
          },
          manga: {
            formattedTitle: TextFormatUtils.formatMangaTitle(c.manga.title),
            title: {
              [scraperName]: c.manga.title,
            },
            id: {
              [scraperName]: c.manga.id,
            },
          },
        };
        intersiteChapters.push(sameChapter);
      }
      if (!sameChapter) {
        continue;
      }
    }
  }

  private findSameChapterFromDifferentSrc(
    intersiteChapter: IntersiteChapter,
    scrapedChapter: Chapter
  ) {
    return (
      intersiteChapter.manga.formattedTitle ===
        TextFormatUtils.formatMangaTitle(scrapedChapter.manga.title) &&
      intersiteChapter.formattedNumber ===
        TextFormatUtils.formatChapterNumber(scrapedChapter.number)
    );
  }
}

export default new ScraperController(scrapersConfig);
