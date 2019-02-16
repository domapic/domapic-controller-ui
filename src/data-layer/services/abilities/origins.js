import { origins } from "reactive-data-source";

import { authConfig } from "../../setup";

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
  ofService: serviceId => {
    if (serviceId) {
      return {
        query: {
          service: serviceId
        }
      };
    }
  }
});
