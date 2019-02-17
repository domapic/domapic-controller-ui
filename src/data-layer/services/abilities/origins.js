import { origins } from "reactive-data-source";

import { authConfig } from "../../setup";

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
