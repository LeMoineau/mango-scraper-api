import { ChapterInfos } from "./chapter";

export default interface Manga {
  id: string;
  name: string;
  author: string;
  image: string;
  chapters?: ChapterInfos[];
}
