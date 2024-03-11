import ChapterViewer from "@shared/types/chapterViewer";
import axios from "axios";
import ChapterPageLoadingError from "../../errors/ChapterPageLoadingError";

export default class DefaultPageLoader {
  public async getPage(
    chapterViewer: ChapterViewer,
    pageNb: number
  ): Promise<Buffer> {
    try {
      const res = await axios.get(
        new URL(chapterViewer.pages[pageNb - 1].url).href,
        {
          responseType: "arraybuffer",
        }
      );
      return res.data;
    } catch (err) {
      console.error(err);
      throw new ChapterPageLoadingError(
        `can't load page "${chapterViewer.pages[pageNb].url}"`
      );
    }
  }
}
