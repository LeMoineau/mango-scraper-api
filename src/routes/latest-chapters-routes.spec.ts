import { beforeAll, describe, expect, it, vi } from "vitest";
import request from "supertest";
import express from "express";
import chaptersRouter from "./latest-chapters-routes";
import chaptersController from "../controllers/latest-chapters-controller";

describe("chapters-routes", () => {
  const AN_ERROR = "une erreur";
  const app = express();

  beforeAll(() => {
    app.use("/chapters", chaptersRouter);
  });

  it("should call ChaptersController getAll", async () => {
    vi.spyOn(chaptersController, "get");

    await request(app).get("/chapters");

    expect(chaptersController.get).toHaveBeenCalled();
  });

  it("should return ok status when getting not error", async () => {
    vi.spyOn(chaptersController, "get").mockResolvedValue([]);

    await request(app).get("/chapters").expect(200);
  });

  it("should return 500 status when getting error", async () => {
    vi.spyOn(chaptersController, "get").mockRejectedValue(AN_ERROR);

    await request(app).get("/chapters").expect(500);
  });
});
