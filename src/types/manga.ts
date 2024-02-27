import { ChapterInfos } from "./chapter";

export interface MangaInfos {
  id: string;
  name: string;
  author: string;
  image: string;
}

export default interface Manga extends MangaInfos {
  chapters: ChapterInfos[];
}
