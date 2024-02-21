import { describe, expect, it } from "vitest";
import settingsController from "./settings-controller";

describe("settings-controller", () => {
  it("should return scrapers enabled when getting config", () => {
    const res = settingsController.get();

    for (let SourceName of Object.keys(scrapersConfig.scrapers)) {
      expect(res.scrapersEnabled).toContainEqual(SourceName);
    }
  });

  it("should return scrapers enabled order by trust level when getting config", () => {
    const res = settingsController.get();

    let previousTrustLevel = 0;
    for (let SourceName of res.scrapersEnabled) {
      expect(
        scrapersConfig.scrapers[SourceName].trustLevel
      ).toBeGreaterThanOrEqual(previousTrustLevel);
      previousTrustLevel = scrapersConfig.scrapers[SourceName].trustLevel;
    }
  });
});
