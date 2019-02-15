import { origins } from "reactive-data-source";
import { authConfig } from "../setup";

// ABILITIES COLLECTION

const ofServiceFilter = serviceId => {
  if (serviceId) {
    return {
      query: {
        service: serviceId
      }
    };
  }
};

export const abilitiesCollection = new origins.Api(
  "/abilities",
  {},
  {
    ...authConfig,
    defaultValue: []
  }
);

abilitiesCollection.addCustomFilter({
  ofService: ofServiceFilter
});
