import { Request, Response, Router } from "express";
import settingsRoute from "./settings-routes";
import scraperRouter from "./scraper.route";
import mangasRouter from "./mangas-routes";
import latestChaptersRouter from "./latest-chapters-routes";

const router = Router();

router.get("/", (_: Request, res: Response) => {
  res.send("Mango-api ready!");
});

router.use("/srcs", scraperRouter);
router.use("/mangas", mangasRouter);
router.use("/latestchapters", latestChaptersRouter);
router.use("/settings", settingsRoute);

export default router;
