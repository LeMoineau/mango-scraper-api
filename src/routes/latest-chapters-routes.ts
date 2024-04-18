import { Router, Request, Response } from "express";
import { RoutingUtils } from "./../../../shared/src/utils/routing-utils";
import { SourceName } from "@shared/types/primitives/Identifiers";
import config from "./../config/config";
import latestChaptersController from "../controllers/latest-chapters-controller";

const latestChaptersRouter = Router();

latestChaptersRouter.get("/", async (req: Request, res: Response) => {
  try {
    const srcs = RoutingUtils.convertQueryParamToArray(req.query.srcs);
    const syncWithBD = RoutingUtils.convertQueryParamToBoolean(
      req.query.syncWithBD
    );
    try {
      if (srcs && !config.areValidSrcs(srcs)) {
        res.status(400).send("srcs must be valid source names");
        return;
      }
      res.send(
        await latestChaptersController.getAll({
          srcs: srcs && (srcs as SourceName[]),
          syncWithBD,
        })
      );
    } catch (error) {
      console.error(error);
      res.status(500).send("server error");
    }
  } catch (err) {
    console.error(err);
    res.status(400).send("wrong parameter: srcs must be string array");
  }
});

export default latestChaptersRouter;
