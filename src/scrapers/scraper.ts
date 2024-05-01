import {
  PagedScrapedChapter,
  ScrapedChapter,
} from "../../../shared/src/types/basics/Chapter";
import { ChapterPage } from "../../../shared/src/types/basics/ChapterPage";
import { Manga, ScrapedManga } from "../../../shared/src/types/basics/Manga";
import {
  ChapterEndpoint,
  MangaEndpoint,
} from "../../../shared/src/types/primitives/Identifiers";

export default interface Scraper {
  /**
   * Get the list of the latest chapters from the source website
   * @returns a list of the latest chapters
   */
  getLatestChapters: () => Promise<ScrapedChapter[]>;

  /**
   * Get all mangas from an user search
   * @returns a list of all mangas which correspond to user search
   */
  searchMangas: ({ q }: { q?: string }) => Promise<Manga[]>;

  /**
   * Get all informations about a manga including its chapters
   * @param id manga id from the source
   * @returns targeted manga informations including chapters
   */
  getManga: (endpoint: MangaEndpoint) => Promise<ScrapedManga | undefined>;

  /**
   * Get chapters by page of a manga
   * @param endpoint manga endpoint on the source
   * @returns current page containing chapters
   */
  // getMangaChapters: (endpoint: MangaEndpoint, props: {pageNumber: number, pageSize?: number}) => Promise<ResponsePage<Chapter>>;

  /**
   * Get the chapter viewer including all its pages
   * @param mangaId manga id from the source
   * @param chapterId chapter id from the source
   * @returns the chapter viewer of the chapter including all its pages
   */
  getChapter: (
    endpoint: ChapterEndpoint
  ) => Promise<PagedScrapedChapter | undefined>;

  /**
   * Get the targeted page of a chapter
   * @param chapterViewer chapterViewer of the targeted chapter
   * @param nbPage targeted chapter page + 1 (nbPage >= 1)
   * @returns Buffer of the image of the chapter
   */
  generatePage: (chapterPage: ChapterPage) => Promise<Buffer | undefined>;
}
