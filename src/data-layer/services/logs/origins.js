import { origins } from "reactive-data-source";

import { authConfig } from "../../setup";

export const logs = new origins.Api(
  "/logs",
  {},
  {
    ...authConfig,
    defaultValue: [],
    expirationTime: 10000
  }
);

export const countLogs = new origins.Api(
  "/logs/stats",
  {},
  {
    ...authConfig,
    defaultValue: {
      total: 0
    },
    expirationTime: 10000
  }
);

countLogs.addCustomFilter({
  ofAbility: abilityId => ({
    query: {
      ability: abilityId
    }
  })
});
