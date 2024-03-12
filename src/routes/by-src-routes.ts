import { Router, Request, Response } from "express";
import mangasController from "../controllers/mangas-controller";
import { RoutingUtils } from "../utils/routing-utils";
import { SourceName } from "@shared/types/primitives/id";

const router = Router();

router.get("/:src/mangas", async (req: Request, res: Response) => {
  try {
    const src = RoutingUtils.convertQueryParamToString(req.params.src)!;
    const query = RoutingUtils.convertQueryParamToString(req.query.query);
    if (!query) {
      res
        .status(400)
        .send("/mangas request must contains at least 'query' param");
      return;
    }
    if (!RoutingUtils.isValidSrc(src)) {
      res.status(400).send("src must be a valid source name");
      return;
    }
    try {
      res.send(
        await mangasController.getAll({
          query,
          srcs: [src as SourceName],
        })
      );
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  } catch (error) {
    res
      .status(400)
      .send(
        "/mangas request must contains 'query', 'srcs' or/and 'ids' params"
      );
  }
});

router.get("/:src/mangas/:mangaId", async (req: Request, res: Response) => {
  try {
    const src = RoutingUtils.convertQueryParamToString(req.params.src)!;
    const mangaId = RoutingUtils.convertQueryParamToString(req.params.mangaId)!;
    if (!RoutingUtils.isValidSrc(src)) {
      res.status(400).send("src must be a valid source name");
      return;
    }
    try {
      res.send(await mangasController.getById(src as SourceName, mangaId));
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  } catch (error) {
    res
      .status(400)
      .send(
        "wrong parameters: src must be a source name and mangaId a valid manga id in the source"
      );
  }
});

router.get(
  "/:src/mangas/:mangaId/chapters/:chapterId",
  async (req: Request, res: Response) => {
    try {
      const src = RoutingUtils.convertQueryParamToString(req.params.src)!;
      const mangaId = RoutingUtils.convertQueryParamToString(
        req.params.mangaId
      )!;
      const chapterId = RoutingUtils.convertQueryParamToString(
        req.params.chapterId
      )!;
      if (!RoutingUtils.isValidSrc(src)) {
        res.status(400).send("src must be a valid source name");
        return;
      }
      try {
        res.send(
          await mangasController.getChapterById(
            src as SourceName,
            mangaId,
            chapterId
          )
        );
      } catch (err) {
        console.error(err);
        res.status(500).send("server error");
      }
    } catch (err) {
      console.error(err);
      res
        .status(400)
        .send(
          "wrong parameters: src must be a valid source name and mangaId & chapterId valid id"
        );
    }
  }
);

router.get(
  "/:src/mangas/:mangaId/chapters/:chapterId/:pageNb",
  async (req: Request, res: Response) => {
    try {
      const src = RoutingUtils.convertQueryParamToString(req.params.src)!;
      const mangaId = RoutingUtils.convertQueryParamToString(
        req.params.mangaId
      )!;
      const chapterId = RoutingUtils.convertQueryParamToString(
        req.params.chapterId
      )!;
      const pageNb = RoutingUtils.convertQueryParamToNumber(req.params.pageNb)!;
      if (!RoutingUtils.isValidSrc(src)) {
        res.status(400).send("src must be a valid source name");
      }
      try {
        res.send(
          await mangasController.getChapterPageById(
            src as SourceName,
            mangaId,
            chapterId,
            pageNb
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
          "wrong arguments: formattedName and formattedNumber must be string"
        );
    }
  }
);

export default router;
