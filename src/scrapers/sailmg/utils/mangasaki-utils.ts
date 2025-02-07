import { TextFormatUtils } from "../../../../../shared/src/utils/text-format-utils";

export namespace MangasakiUtils {
  export function calculateDateFromString(dateStr: string): Date {
    const d = new Date();
    const [nbStr, timePrimitive, _] = dateStr.split(" ");
    const nb = parseInt(nbStr);
    if (timePrimitive === "minute" || timePrimitive === "minutes") {
      d.setMinutes(d.getMinutes() - nb);
    } else if (timePrimitive === "hour" || timePrimitive === "hours") {
      d.setHours(d.getHours() - nb);
    } else if (timePrimitive === "day" || timePrimitive === "days") {
      d.setDate(d.getDate() - nb);
    }
    return d;
  }

  export function formatChapterNumber(
    chapterName: string,
    mangaTitle: string
  ): string {
    return TextFormatUtils.stringWithout(
      chapterName.toUpperCase(),
      mangaTitle.toUpperCase()
    ).trim();
  }
}
