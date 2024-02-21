import axios from "axios";
import * as cheerio from "cheerio";

export namespace ScrapingUtils {
  export async function requestToCheerioPage(
    url: string
  ): Promise<cheerio.CheerioAPI> {
    return await axios.get(url).then((res) => cheerio.load(res.data));
  }
}
