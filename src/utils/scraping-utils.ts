import axios from "axios";
import * as cheerio from "cheerio";

export namespace ScrapingUtils {
  export async function requestToCheerioPage(
    url: string
  ): Promise<cheerio.CheerioAPI> {
    return await axios
      .get(url, {
        headers: {
          Accept: "application/json, text/plain, */*",
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.117 Safari/537.36",
          "accept-encoding": "gzip, compress, deflate, br",
        },
      })
      .then((res) => {
        return cheerio.load(res.data);
      });
  }
}
