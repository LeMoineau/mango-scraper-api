import { IntersiteField } from "./IntersiteField";

export interface IntersiteChapterInfos {
  title: IntersiteField<string>;
  number: IntersiteField<string>;
  formattedNumber: string;
  image: IntersiteField<string>;
  date: IntersiteField<Date>;
  id: IntersiteField<string>;
}

export default interface IntersiteChapter extends IntersiteChapterInfos {
  manga: {
    formattedTitle: string;
    title: IntersiteField<string>;
    id: IntersiteField<string>;
  };
}
