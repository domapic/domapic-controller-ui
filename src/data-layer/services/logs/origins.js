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

export const countLogs = new origins.Api(
  "/logs/count",
  {},
  {
    ...authConfig,
    defaultValue: {
      total: 0
    }
  }
);
