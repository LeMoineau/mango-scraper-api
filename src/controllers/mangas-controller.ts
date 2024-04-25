import { Manga } from "../../../shared/src/types/Manga";
import { SourceName } from "../../../shared/src/types/primitives/Identifiers";
import config from "../config/config";
import BDSyncService from "../services/BDSync.service";

class MangasController {
  public async searchMangas(props: {
    query: string;
    srcs?: SourceName[];
    syncWithBD?: boolean;
  }): Promise<Manga[]> {
    let mangas: Manga[] = [];
    for (let src of props.srcs ?? config.getEnabledSource()) {
      const tmpMangas = await config
        .getScraperOfSrc(src)
        .searchMangas({ q: props.query });
      mangas.push(...tmpMangas);
      if (props.syncWithBD) {
        await BDSyncService.syncMangas(tmpMangas);
      }
    }
    return mangas;
  }
}

export default new MangasController();
