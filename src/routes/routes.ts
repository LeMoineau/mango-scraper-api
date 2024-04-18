import { Request, Response, Router } from "express";
import settingsRoute from "./settings-routes";
import scraperRouter from "./scraper.route";
import mangasRouter from "./mangas-routes";

const router = Router();

router.get("/", (_: Request, res: Response) => {
  res.send("Mango-api ready!");
});

// router.use("/latestchapters", latestChaptersRoute);
router.use("/srcs", scraperRouter);
router.use("/mangas", mangasRouter);
router.use("/settings", settingsRoute);

export default router;
