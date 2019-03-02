import { origins } from "reactive-data-source";

import { authConfig } from "../../setup";
import { socket } from "../../socket";

export const usersCollection = new origins.Api(
  "/users",
  {
    create: true
  },
  {
    ...authConfig,
    defaultValue: []
  }
);

socket.addListener(["user:created", "user:updated", "user:deleted"], () => {
  usersCollection.clean();
});
