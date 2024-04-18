import axios from "axios";
import ChapterPageLoadingError from "../../errors/ChapterPageLoadingError";
import { ChapterPage } from "../../../../shared/src/types/ChapterPage";

export default class DefaultPageLoader {
  public async generatePage(
    chapterPage: ChapterPage
  ): Promise<Buffer | undefined> {
    try {
      const res = await axios.get(new URL(chapterPage.url).href, {
        responseType: "arraybuffer",
      });
      return res.data;
    } catch (err) {
      console.error(err);
      return;
    }
  }
}
