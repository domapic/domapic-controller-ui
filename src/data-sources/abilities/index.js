import { origins } from "reactive-data-source";

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
    defaultValue: []
  }
);

abilitiesCollection.addCustomFilter({
  ofService: ofServiceFilter
});
