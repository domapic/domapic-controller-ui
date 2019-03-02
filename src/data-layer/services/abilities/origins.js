import { origins } from "reactive-data-source";

import { authConfig } from "../../setup";
import { socket } from "../../socket";

import { ofService } from "./filters";

// ABILITIES COLLECTION

export const abilitiesCollection = new origins.Api(
  "/abilities",
  {},
  {
    ...authConfig,
    defaultValue: []
  }
);

abilitiesCollection.addCustomFilter({
  ofService
});

socket.addListener(["ability:created", "ability:deleted", "ability:updated"], () => {
  abilitiesCollection.clean();
});
