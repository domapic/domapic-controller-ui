import { origins } from "reactive-data-source";

import { baseConfig } from "../../setup";

export const about = new origins.Api(
  "/about",
  {},
  {
    ...baseConfig,
    defaultValue: {}
  }
);
