import { origins } from "reactive-data-source";

import { authConfig } from "../../setup";

import { byIdFilter } from "../../helpers";

// SERVICE MODELS

export const abilityModels = new origins.Api(
  "/abilities/:id",
  {},
  {
    ...authConfig,
    defaultValue: {}
  }
);

abilityModels.addCustomFilter({
  byId: byIdFilter
});
