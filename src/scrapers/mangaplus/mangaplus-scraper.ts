import ScraperParsingError from "../../errors/ScraperParsingError";
import { ArrayUtils } from "../../utils/array-utils";
import { ProtoManaging } from "../../utils/proto-managing";
import { TextFormatUtils } from "../../utils/text-format-utils";
import Chapter, { ChapterInfos } from "../../types/chapter";
import Manga from "../../types/manga";
import Scraper from "../scraper";
import { MangaPlusCard } from "./types/mangaplusCard";
import { MangaplusUtils } from "./utils/mangaplus-utils";

class MangaPlusScraper implements Scraper {
  private API_ENDPOINT =
    process.env.MANGAPLUS_API_ENDPOINT ??
    "https://jumpg-webapi.tokyo-cdn.com/api";

  public async getLatestChapters(): Promise<Chapter[]> {
    const jsonRes = await MangaplusUtils.decodeJsonFromMangaPlusRequest(
      `${this.API_ENDPOINT}/web/web_homeV3?lang=eng`,
      `${__dirname}/protos/web_homeV3.proto`,
      "mangaplus.Web_homeV3"
    );
    const chapters: Chapter[] = [];
    const currentDate: Date = new Date();
    try {
      for (let s of jsonRes.parent.data.sections) {
        chapters.push(
          ...s.cards.map((c: MangaPlusCard) => {
            return {
              number: TextFormatUtils.formatChapterNumber(
                ArrayUtils.tryingSplitAndGet(c.chapter.chapter, "#", 1)
              ),
              id: c.chapter.id.toString(),
              image: c.chapter.manga.portraitThumbnail,
              releaseDate: currentDate,
              title: c.chapter.title,
              manga: {
                title: c.mangaTitle,
                id: c.chapter.manga.id.toString(),
              },
            } as Chapter;
          })
        );
        currentDate.setDate(currentDate.getDate() - 1);
      }
    } catch (error) {
      console.error(error);
      throw new ScraperParsingError(
        "json recieved from manga plus api not have the expected format"
      );
    }
    return chapters;
  }

  public async getMangas({ q }: { q?: string | undefined }): Promise<Manga[]> {
    throw new Error("Function not implemented.");
  }

  public async getManga(id: string): Promise<Manga> {
    const jsonRes = await MangaplusUtils.decodeJsonFromMangaPlusRequest(
      `${this.API_ENDPOINT}/title_detailV3?title_id=${id}`,
      `${__dirname}/protos/title_detailV3.proto`,
      "mangaplus.Title_detailV3"
    );
    try {
      let chapters: ChapterInfos[] = [];
      for (let c of jsonRes.parent.data.chapters) {
        for (let label of [
          "freeInitialChapters",
          "appExclusiveChapters",
          "freeLatestChapters",
        ])
          if (c[label])
            chapters.push(
              ...ArrayUtils.transformEachItemOf(
                c[label],
                (item: any): ChapterInfos => {
                  return {
                    id: item.chapterId,
                    number: item.chapter,
                    title: item.title,
                    image: item.thumbnail,
                    releaseDate: new Date(item.releaseDate * 1000),
                    expirationDate: new Date(item.expirationDate * 1000),
                  };
                }
              )
            );
      }
      const manga: Manga = {
        id: id,
        name: jsonRes.parent.data.manga.title,
        author: jsonRes.parent.data.manga.author,
        image: jsonRes.parent.data.manga.portraitThumbnail,
        chapters: chapters,
      };
      return manga;
    } catch (error) {
      console.error(error);
      throw new ScraperParsingError(
        "json received from manga plus api not have the expected format"
      );
    }
  }
}

export default new MangaPlusScraper();
