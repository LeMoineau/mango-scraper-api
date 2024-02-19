import { Router, Request, Response } from "express";
import mangasController from "../controllers/mangas-controller";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    res.send(await mangasController.getAll({}));
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:src/:id", async (req: Request, res: Response) => {
  res.send(
    await mangasController.get({ src: req.params.src, id: req.params.id })
  );
});

router.get(
  "/:src/:id/chapters/:chapterId",
  async (req: Request, res: Response) => {
    res.send(
      await mangasController.getChapterPages(
        req.params.src,
        req.params.id,
        req.params.chapterId
      )
    );
  }
);

router.get("/:name/chapters", async (req: Request, res: Response) => {});

export default router;
