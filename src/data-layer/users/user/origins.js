import { origins } from "reactive-data-source";

import { authConfig } from "../../setup";
import { byIdFilter } from "../../helpers";

export const userModels = new origins.Api(
  "/users/:id",
  {
    update: true,
    delete: true
  },
  {
    ...authConfig,
    defaultValue: {}
  }
);

userModels.addCustomFilter({
  byId: byIdFilter
});
