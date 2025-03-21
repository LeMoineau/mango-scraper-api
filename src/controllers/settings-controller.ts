import { CommonLangs } from "../../../shared/src/config/enums/CommonLangs";
import { ApiSettings } from "../../../shared/src/types/config/ApiSettings";
import config from "../config/config";

class SettingsController {
  public get(): ApiSettings {
    return {
      scrapersEnabled: config.getEnabledSource(),
      languagesSupported: Object.values(CommonLangs),
    };
  }
}

export default new SettingsController();
