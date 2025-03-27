import { Request, Response, Router } from "express";
import { RoutingUtils } from "../../../shared/src/utils/routing-utils";
import { isSourceName } from "../../../shared/src/types/primitives/Identifiers";
import config from "../config/config";
import scraperController from "../controllers/scraper.controller";
import { isChapterPage } from "../../../shared/src/types/basics/ChapterPage";

const scraperRouter = Router();

scraperRouter.get(
  "/:src/latestchapters",
  async (req: Request, res: Response) => {
    try {
      const src = RoutingUtils.convertQueryParamToString(req.params.src);
      const syncWithBD = RoutingUtils.convertQueryParamToBoolean(
        req.query.syncWithBD
      );
      if (!isSourceName(src) || (src && !config.isValidSrc(src))) {
        res.status(400).send("src must be a valid source");
        return;
      }
      try {
        res.send(
          await scraperController.getLatestChaptersOf(src, { syncWithBD })
        );
      } catch (error) {
        console.error(error);
        res.status(500).send(error);
      }
    } catch (error) {
      res
        .status(400)
        .send("wrong paramters: request params must contain src (SourceName)");
    }
  }
);

scraperRouter.post(
  "/:src/mangas/search",
  async (req: Request, res: Response) => {
    try {
      const src = RoutingUtils.convertQueryParamToString(req.params.src);
      const query = RoutingUtils.convertQueryParamToString(req.body.query);
      const syncWithBD = RoutingUtils.convertQueryParamToBoolean(
        req.body.syncWithBD
      );
      if (!isSourceName(src) || (src && !config.isValidSrc(src))) {
        res.status(400).send("src must be a valid source");
        return;
      }
      if (!query) {
        res.status(400).send("query must be defined for mangas serach");
        return;
      }
      try {
        res.send(
          await scraperController.searchMangasOf(src, { query, syncWithBD })
        );
      } catch (error) {
        console.error(error);
        res.status(500).send(error);
      }
    } catch (error) {
      console.error(error);
      res
        .status(400)
        .send("wrong parameters: request params must contain src (SourceName)");
    }
  }
);

scraperRouter.get(
  "/:src/mangas/:endpoint",
  async (req: Request, res: Response) => {
    try {
      const src = RoutingUtils.convertQueryParamToString(req.params.src);
      const endpoint = RoutingUtils.convertQueryParamToString(
        req.params.endpoint
      );
      const syncWithBD = RoutingUtils.convertQueryParamToBoolean(
        req.query.syncWithBD
      );
      if (!isSourceName(src) || (src && !config.isValidSrc(src))) {
        res.status(400).send("src must be a valid source");
        return;
      }
      if (!endpoint) {
        res.status(400).send("endpoint params must be defined");
        return;
      }
      try {
        const manga = await scraperController.getMangaOf(src, endpoint, {
          syncWithBD,
        });
        if (!manga) {
          res.status(404).send(`manga at endpoint "${endpoint}" not found`);
          return;
        }
        res.send(manga);
      } catch (error) {
        console.error(error);
        res.status(500).send(error);
      }
    } catch (error) {
      console.error(error);
      res
        .status(400)
        .send("wrong parameters: request params must contain src (SourceName)");
    }
  }
);

scraperRouter.get(
  "/:src/mangas/:endpoint/chapters",
  async (req: Request, res: Response) => {
    try {
      const src = RoutingUtils.convertQueryParamToString(req.params.src);
      const endpoint = RoutingUtils.convertQueryParamToString(
        req.params.endpoint
      );
      const syncWithBD = RoutingUtils.convertQueryParamToBoolean(
        req.query.syncWithBD
      );
      const pageNumber = RoutingUtils.convertQueryParamToNumber(req.query.page);
      const pageSize = RoutingUtils.convertQueryParamToNumber(req.query.limit);
      if (!isSourceName(src) || (src && !config.isValidSrc(src))) {
        res.status(400).send("src must be a valid source");
        return;
      }
      if (!endpoint) {
        res.status(400).send("endpoint params must be defined");
        return;
      }
      if (pageNumber !== undefined && pageNumber < 1) {
        res.status(400).send("page number must be at least 1");
        return;
      }
      try {
        const chapters = await scraperController.getChaptersOfManga(
          src,
          endpoint,
          {
            syncWithBD,
            pageNumber: pageNumber ?? 1,
            pageSize,
          }
        );
        if (!chapters) {
          res
            .status(404)
            .send(`no chapters found for manga at endpoint "${endpoint}"`);
          return;
        }
        res.send(chapters);
      } catch (error) {
        console.error(error);
        res.status(500).send(error);
      }
    } catch (error) {
      console.error(error);
      res
        .status(400)
        .send("wrong parameters: request params must contain src (SourceName)");
    }
  }
);

scraperRouter.get(
  "/:src/chapters/:endpoint",
  async (req: Request, res: Response) => {
    try {
      const src = RoutingUtils.convertQueryParamToString(req.params.src);
      const endpoint = RoutingUtils.convertQueryParamToString(
        req.params.endpoint
      );
      const syncWithBD = RoutingUtils.convertQueryParamToBoolean(
        req.query.syncWithBD
      );
      if (!isSourceName(src) || (src && !config.isValidSrc(src))) {
        res.status(400).send("src must be a valid source");
        return;
      }
      if (!endpoint) {
        res.status(400).send("endpoint params must be defined");
        return;
      }
      await scraperController
        .getChapterOf(src, endpoint, {
          syncWithBD,
        })
        .then((chapter) => {
          if (!chapter) {
            res.status(404).send(`chapter at endpoint "${endpoint}" not found`);
            return;
          }
          res.send(chapter);
        })
        .catch((err: Error) => {
          console.error(err);
          res.status(500).send(err.message);
        });
    } catch (error) {
      console.error(error);
      res
        .status(400)
        .send("wrong parameters: request params must contain src (SourceName)");
    }
  }
);

scraperRouter.post(
  "/:src/generatePage",
  async (req: Request, res: Response) => {
    try {
      const src = RoutingUtils.convertQueryParamToString(req.params.src);
      const chapterPage = req.body.page;
      if (!isSourceName(src) || (src && !config.isValidSrc(src))) {
        res.status(400).send("src must be a valid source");
        return;
      }
      if (!isChapterPage(chapterPage)) {
        res.status(400).send("page must be a ChapterPage");
        return;
      }
      try {
        const page = await scraperController.generatePageOf(src, chapterPage);
        if (!page) {
          res.status(404).send(`page not found at url "${chapterPage.url}"`);
        }
        res.send(page);
      } catch (error) {
        console.error(error);
        res.status(500).send(error);
      }
    } catch (error) {
      console.error(error);
      res
        .status(400)
        .send("wrong parameters: request params must contain src (SourceName)");
    }
  }
);

export default scraperRouter;
