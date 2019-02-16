import { origins } from "reactive-data-source";

import { authConfig } from "../../setup";

import { typeFilter } from "./filters";

// SERVICES COLLECTION

export const servicesCollection = new origins.Api(
  "/services",
  {},
  {
    ...authConfig,
    defaultValue: []
  }
);

servicesCollection.addCustomFilter({
  type: typeFilter
});
