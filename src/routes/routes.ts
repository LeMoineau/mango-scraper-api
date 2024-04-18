import { Request, Response, Router } from "express";
import latestChaptersRoute from "./latest-chapters-routes";
import mangasRoute from "./mangas-routes";
import settingsRoute from "./settings-routes";
import bySrcRoute from "./by-src-routes";
import scraperRouter from "./scraper.route";

const router = Router();

router.get("/", (_: Request, res: Response) => {
  res.send("Mango-api ready!");
});

// router.use("/latestchapters", latestChaptersRoute);
// router.use("/mangas", mangasRoute);
router.use("/settings", settingsRoute);
router.use("/srcs", scraperRouter);

export default router;
