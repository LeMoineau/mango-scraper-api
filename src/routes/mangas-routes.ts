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
    if (!query || (!ids && !srcs)) {
      res
        .status(400)
        .send(
          "/mangas request must contains 'query', 'srcs' or/and 'ids' params"
        );
      return;
    }
    if (ids && srcs && ids.length > 0 && srcs.length !== ids.length) {
      res
        .status(400)
        .send(
          "when ids is specified, srcs and ids array must have the same size"
        );
      return;
    }
    if (srcs && !RoutingUtils.areValidSrcs(srcs)) {
      res.status(400).send("srcs must be valid source names");
      return;
    }
    console.log("srcs", srcs);
    try {
      res.send(
        await mangasController.getAll({
          query,
          srcs: srcs && (srcs as SourceName[]),
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
    )!;
    try {
      const srcs = RoutingUtils.convertQueryParamToArray(req.query.srcs);
      const dontDigIn = RoutingUtils.convertQueryParamToBoolean(
        req.query.dontDigIn
      );
      try {
        if (srcs && !RoutingUtils.areValidSrcs(srcs)) {
          res.status(400).send("srcs must be valid src");
          return;
        }
        const manga = await mangasController.get({
          formattedName,
          srcs: srcs && (srcs as SourceName[]),
          dontDigIn,
        });
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
      res
        .status(400)
        .send(
          "query parameters possible are srcs (SourceName[]) and dontDigIn (boolean)"
        );
    }
  } catch (err) {
    console.error(err);
    res.status(400).send("formattedName must be a string");
  }
});

router.get(
  "/:formattedName/chapters/:src/:chapterId",
  async (req: Request, res: Response) => {
    try {
      const formattedName = RoutingUtils.convertQueryParamToString(
        req.params.formattedName
      )!;
      const src = RoutingUtils.convertQueryParamToString(req.params.src)!;
      const chapterId = RoutingUtils.convertQueryParamToString(
        req.params.chapterId
      )!;
      if (src && !RoutingUtils.isValidSrc(src)) {
        res.status(400).send("source must be a valid source name");
        return;
      }
      try {
        res.send(
          await mangasController.getChapterPages(
            src as SourceName,
            formattedName,
            chapterId
          )
        );
      } catch (error) {
        console.error(error);
        res.status(500).send(error);
      }
    } catch (err) {
      res
        .status(400)
        .send(
          "wrong arguments: formattedName, src and chapterId must be string"
        );
    }
  }
);

export default router;
