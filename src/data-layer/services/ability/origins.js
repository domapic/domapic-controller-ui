import { origins } from "reactive-data-source";

import { authConfig } from "../../setup";
import { socket } from "../../socket";

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

export const abilityStates = new origins.Api(
  "/abilities/:id/state",
  {},
  {
    ...authConfig,
    defaultValue: {}
  }
);

abilityStates.addCustomFilter({
  byId: byIdFilter
});

export const abilityActions = new origins.Api(
  "/abilities/:id/action",
  {
    create: true
  },
  {
    ...authConfig,
    defaultValue: {}
  }
);

abilityActions.addCustomFilter({
  byId: byIdFilter
});

socket.addListener("ability:event", eventData => {
  abilityStates.byId(eventData._id).clean();
});
