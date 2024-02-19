import Chapter from "../types/chapter";
import Manga from "../types/manga";

export default interface Scraper {
  getLatestChapters: () => Promise<Chapter[]>;
  getMangas: ({ q }: { q?: string }) => Promise<Manga[]>;
  getManga: (id: string) => Promise<Manga>;
}
