import { IntersiteField } from "./IntersiteField";
import { ChapterInfos } from "../chapter";

export interface IntersiteManga {
  id: IntersiteField<string>;
  name: IntersiteField<string>;
  author: IntersiteField<string>;
  image: IntersiteField<string>;
  chapters?: IntersiteField<ChapterInfos[]>;
}
