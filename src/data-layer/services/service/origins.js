import { origins } from "reactive-data-source";

import { authConfig } from "../../setup";
import { socket } from "../../socket";

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

socket.addListener(["service:updated", "service:deleted"], eventData => {
  serviceModels.byId(eventData._id).clean();
});
