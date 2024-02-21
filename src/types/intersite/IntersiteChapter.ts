import { IntersiteField } from "./IntersiteField";

export interface IntersiteChapterInfos {
  id: IntersiteField<string>;
  title: IntersiteField<string>;
  number: IntersiteField<string>;
  formattedNumber: string;
  image: IntersiteField<string>;
  realeaseDate: IntersiteField<Date>;
}

export default interface IntersiteChapter extends IntersiteChapterInfos {
  manga: {
    formattedTitle: string;
    title: IntersiteField<string>;
    id: IntersiteField<string>;
  };
}
