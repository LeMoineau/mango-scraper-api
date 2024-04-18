import { ApiSettings } from "../../../shared/src/types/config/ApiSettings";
import config from "../config/config";

class SettingsController {
  public get(): ApiSettings {
    return {
      scrapersEnabled: config.getEnabledSource(),
    };
  }
}

export default new SettingsController();
