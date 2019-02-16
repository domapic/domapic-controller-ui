import { origins } from "reactive-data-source";

import { authConfig } from "../../setup";

export const logs = new origins.Api(
  "/logs",
  {},
  {
    ...authConfig,
    defaultValue: []
  }
);
