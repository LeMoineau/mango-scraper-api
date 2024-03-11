import Chapter from "@shared/types/chapter";
import ChapterViewer from "@shared/types/chapterViewer";
import Manga, { MangaSearchInfos } from "@shared/types/manga";
import { FormattedName } from "@shared/types/primitives/id";

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
  getMangas: ({ q }: { q?: string }) => Promise<MangaSearchInfos[]>;

  /**
   * Get all informations about a manga including its chapters
   * @param id manga id from the source
   * @returns targeted manga informations including chapters
   */
  getManga: (id: string) => Promise<Manga>;

  /**
   * Get the chapter viewer including all its pages
   * @param formattedName manga formattedName
   * @param chapterId chapter id from the source
   * @returns the chapter viewer of the chapter including all its pages
   */
  getChapterPages: (
    formattedName: FormattedName,
    chapterId: string
  ) => Promise<ChapterViewer>;

  /**
   * Get the targeted page of a chapter
   * @param chapterViewer chapterViewer of the targeted chapter
   * @param nbPage targeted chapter page
   * @returns Buffer of the image of the chapter
   */
  getPage: (chapterViewer: ChapterViewer, pageNb: number) => Promise<Buffer>;
}
