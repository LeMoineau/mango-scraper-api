import { Router, Request, Response } from "express";
import latestChapters from "../controllers/latest-chapters-controller";

const router = Router();

router.get("/", async (_: Request, res: Response) => {
  try {
    res.send(await latestChapters.get());
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
