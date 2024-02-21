import { describe, expect, it, vi } from "vitest";
import settingsController from "./settings-controller";
import config from "../config/config";
import { SourceName } from "../types/primitives/scrapersConfig";

describe("settings-controller", () => {
  describe("get", () => {
    it("should return source enabled when getting config", () => {
      const ENABLED_SOURCES: SourceName[] = ["mangaplus", "mangasaki"];
      vi.spyOn(config, "getEnabledSource").mockReturnValue(ENABLED_SOURCES);

      const res = settingsController.get();

      expect(res.scrapersEnabled).toStrictEqual(ENABLED_SOURCES);
    });
  });
});
