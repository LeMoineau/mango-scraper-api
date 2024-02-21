import { Router, Request, Response, query } from "express";
import mangasController from "../controllers/mangas-controller";
import { RoutingUtils } from "../utils/routing-utils";
import { SourceName } from "../types/primitives/scrapersConfig";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  let query: string;
  let srcs, ids: string[];
  if (req.query.query) {
    try {
      query = RoutingUtils.convertQueryParamToString(req.query.query);
      try {
        res.send(await mangasController.getAll({ query: query }));
      } catch (error) {
        console.error(error);
        res.status(500).send(error);
      }
    } catch (error) {
      res.status(400).send(error);
    }
  } else if (req.query.srcs && req.query.ids) {
    try {
      srcs = RoutingUtils.convertQueryParamToArray(req.query.srcs);
      ids = RoutingUtils.convertQueryParamToArray(req.query.ids);
      if (srcs.length !== ids.length) {
        res.status(400).send("srcs and ids array must have the same size");
        return;
      }
      if (!RoutingUtils.areValidSrcs(srcs)) {
        res.status(400).send("srcs must be valid source names");
        return;
      }
      try {
        res.send(
          await mangasController.getAll({
            srcs: srcs as SourceName[],
            ids: ids,
          })
        );
      } catch (error) {
        console.error(error);
        res.status(500).send(error);
      }
    } catch (error) {
      res.status(400).send(error);
    }
  } else {
    res
      .status(400)
      .send(
        "/mangas request must contains 'query' param or 'srcs' and 'ids' params"
      );
  }
});

router.get("/:src/:id", async (req: Request, res: Response) => {
  if (!RoutingUtils.isValidSrc(req.params.src)) {
    res.status(400).send("source must be a valid source name");
    return;
  }
  try {
    res.send(
      await mangasController.get(req.params.src as SourceName, req.params.id)
    );
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.get(
  "/:src/:mangaId/chapters/:chapterId",
  async (req: Request, res: Response) => {
    if (!RoutingUtils.isValidSrc(req.params.src)) {
      res.status(400).send("source must be a valid source name");
      return;
    }
    try {
      res.send(
        await mangasController.getChapterPages(
          req.params.src as SourceName,
          req.params.mangaId,
          req.params.chapterId
        )
      );
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }
);

export default router;
