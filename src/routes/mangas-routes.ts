import { Router, Request, Response, query } from "express";
import mangasController from "../controllers/mangas-controller";
import { RoutingUtils } from "../utils/routing-utils";
import { SourceName } from "../types/primitives/scrapersConfig";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const query = RoutingUtils.convertQueryParamToString(req.query.query);
    const srcs = RoutingUtils.convertQueryParamToArray(req.query.srcs);
    const ids = RoutingUtils.convertQueryParamToArray(req.query.ids);
    if (ids.length > 0 && srcs.length !== ids.length) {
      res
        .status(400)
        .send(
          "when ids is specified, srcs and ids array must have the same size"
        );
      return;
    }
    if (!RoutingUtils.areValidSrcs(srcs)) {
      res.status(400).send("srcs must be valid source names");
      return;
    }
    try {
      res.send(
        await mangasController.getAll({
          query,
          srcs: srcs as SourceName[],
          ids,
        })
      );
    } catch (error) {
      console.error(error);
      res.status(500).send("server error");
    }
  } catch (error) {
    res
      .status(400)
      .send(
        "/mangas request must contains 'query', 'srcs' or/and 'ids' params"
      );
  }
});

router.get("/:formattedName", async (req: Request, res: Response) => {
  try {
    const formattedName = RoutingUtils.convertQueryParamToString(
      req.params.formattedName
    );
    try {
      const manga = await mangasController.get({ formattedName });
      if (!manga) {
        res
          .status(404)
          .send(
            `manga not found. Try making a global search at /mangas?query=YOUR_MANGA`
          );
        return;
      }
      res.send(manga);
    } catch (error) {
      console.error(error);
      res.status(500).send("server error");
    }
  } catch (err) {
    console.error(err);
    res.status(400).send("formattedname must be a string");
  }
});

router.get(
  "/:formattedName/chapters/:chapterId",
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
