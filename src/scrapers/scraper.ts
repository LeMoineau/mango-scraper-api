import Chapter from "../types/chapter";
import ChapterViewer from "../types/chapterViewer";
import Manga, { MangaInfos } from "../types/manga";

export default interface Scraper {
  /**
   * Get the list of the latest chapters from the source website
   * @returns a list of the latest chapters
   */
  getLatestChapters: () => Promise<Chapter[]>;

  /**
   * Get all mangas from an user search
   * @returns a list of all mangas which correspond to user search
   */
  getMangas: ({ q }: { q?: string }) => Promise<MangaInfos[]>;

  /**
   * Get all informations about a manga including its chapters
   * @param id manga id from the source
   * @returns targeted manga informations including chapters
   */
  getManga: (id: string) => Promise<Manga>;

  /**
   * Get the chapter viewer including all its pages
   * @param mangaId manga id from the source
   * @param chapterId chapter id from the source
   * @returns the chapter viewer of the chapter including all its pages
   */
  getChapterPages: (
    mangaId: string,
    chapterId: string
  ) => Promise<ChapterViewer>;
}
