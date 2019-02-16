import { origins } from "reactive-data-source";

import { authConfig } from "../../setup";

export const config = new origins.Api(
  "/config",
  {},
  {
    ...authConfig,
    defaultValue: {}
  }
);
