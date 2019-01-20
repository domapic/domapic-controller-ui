import { origins, Selector } from "reactive-data-source";

import { config } from "../config";

// SERVICES COLLECTION

export const servicesCollection = new origins.Api(`${config.baseApi}/services`);

const typeFilter = serviceType => {
  if (serviceType && serviceType.length) {
    return {
      query: {
        type: serviceType
      }
    };
  }
};

servicesCollection.addCustomFilter({
  type: typeFilter
});

// SELECTORS

export const modules = new Selector(
  {
    source: servicesCollection,
    filter: () => typeFilter("module")
  },
  servicesResults => servicesResults
);
