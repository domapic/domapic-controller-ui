import { throttle } from "lodash";
import { origins } from "reactive-data-source";

import { authConfig } from "../../setup";
import { socket } from "../../socket";

const REFRESH_LOGS_MAX_INTERVAL = 5000;

export const logs = new origins.Api(
  "/logs",
  {},
  {
    ...authConfig,
    defaultValue: []
  }
);

export const countLogs = new origins.Api(
  "/logs/stats",
  {},
  {
    ...authConfig,
    defaultValue: {
      total: 0
    }
  }
);

countLogs.addCustomFilter({
  ofAbility: abilityId => ({
    query: {
      ability: abilityId
    }
  })
});

socket.addListener(
  "log:created",
  throttle(() => {
    countLogs.clean();
    logs.clean();
  }, REFRESH_LOGS_MAX_INTERVAL)
);
