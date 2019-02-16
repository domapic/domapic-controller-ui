import { origins } from "reactive-data-source";

import { authConfig } from "../../setup";

import { byIdFilter } from "../../helpers";

// SERVICE MODELS

export const serviceModels = new origins.Api(
  "/services/:id",
  {},
  {
    ...authConfig,
    defaultValue: {}
  }
);

serviceModels.addCustomFilter({
  byId: byIdFilter
});
