import { IntersiteField } from "./IntersiteField";
import { IntersiteChapterInfos } from "./IntersiteChapter";

export interface IntersiteManga {
  id: IntersiteField<string>;
  name: IntersiteField<string>;
  formattedName: string;
  author: IntersiteField<string>;
  image: IntersiteField<string>;
  chapters: IntersiteChapterInfos[];
}
