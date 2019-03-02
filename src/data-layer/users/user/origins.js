import { origins } from "reactive-data-source";

import { authConfig } from "../../setup";
import { socket } from "../../socket";
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

socket.addListener(["user:updated", "user:deleted"], userData => {
  userModels.byId(userData._id).clean();
});
