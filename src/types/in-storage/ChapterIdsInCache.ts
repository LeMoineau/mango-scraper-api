import { IntersiteField } from "@shared/types/intersite/IntersiteField";
import {
  ChapterEndpoint,
  FormattedName,
  FormattedNumber,
  MangaEndpoint,
} from "@shared/types/primitives/id";

export interface ChapterIdsInCache {
  [formattedName: FormattedName]: {
    [formattedNumber: FormattedNumber]: IntersiteField<ChapterEndpoint>;
  };
}
