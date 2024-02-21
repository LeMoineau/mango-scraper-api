import config from "../config/config";

class SettingsController {
  public get() {
    return {
      scrapersEnabled: config.getEnabledSource(),
    };
  }
}

export default new SettingsController();
