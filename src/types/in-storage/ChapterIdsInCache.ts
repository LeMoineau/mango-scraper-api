import { IntersiteField } from "@shared/types/intersite/IntersiteField";
import {
  ChapterId,
  FormattedName,
  FormattedNumber,
  MangaId,
} from "@shared/types/primitives/id";

export interface ChapterIdsInCache {
  [formattedName: FormattedName]: {
    [formattedNumber: FormattedNumber]: IntersiteField<ChapterId>;
  };
}
