import { Router, Request, Response } from "express";
import latestChapters from "../controllers/latest-chapters-controller";
import { RoutingUtils } from "../utils/routing-utils";
import { SourceName } from "../types/primitives/scrapersConfig";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    try {
      const srcs = RoutingUtils.convertQueryParamToArray(req.query.srcs);
      if (srcs && !RoutingUtils.areValidSrcs(srcs)) {
        res.status(400).send("srcs must be valid source names");
        return;
      }
      res.send(
        await latestChapters.get({ srcs: srcs && (srcs as SourceName[]) })
      );
    } catch (err) {
      console.error(err);
      res.status(400).send("wrong parameter: srcs must be string array");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

export default router;
