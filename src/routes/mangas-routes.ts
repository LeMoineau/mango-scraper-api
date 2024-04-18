import { Router, Request, Response } from "express";
import mangasController from "../controllers/mangas-controller";
import { RoutingUtils } from "./../../../shared/src/utils/routing-utils";
import config from "./../config/config";
import { SourceName } from "../../../shared/src/types/primitives/Identifiers";

const mangasRouter = Router();

mangasRouter.post("/search", async (req: Request, res: Response) => {
  try {
    const query = RoutingUtils.convertQueryParamToString(req.body.query);
    const srcs = RoutingUtils.convertQueryParamToArray(req.body.srcs);
    const syncWithBD = RoutingUtils.convertQueryParamToBoolean(
      req.body.syncWithBD
    );
    if (!query) {
      res.status(400).send("request must contains 'query' params");
      return;
    }
    if (srcs && !config.areValidSrcs(srcs)) {
      res.status(400).send("srcs must be valid and enabled sources");
      return;
    }
    try {
      res.send(
        await mangasController.searchMangas({
          query,
          srcs: srcs as SourceName[],
          syncWithBD,
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

export default mangasRouter;
