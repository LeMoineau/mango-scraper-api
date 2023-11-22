import { Request, Response, Router } from "express";
import chaptersRoute from "./chapters-routes";
import mangasRoute from "./mangas-routes";

const router = Router();

router.get("/", (_: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

router.use("/chapters", chaptersRoute);
router.use("/mangas", mangasRoute);

export default router;
