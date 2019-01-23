import { origins, Selector } from "reactive-data-source";

// SERVICES COLLECTION

export const servicesCollection = new origins.Api("/services");

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

export const modulesCollection = new Selector(
  {
    source: servicesCollection,
    filter: () => typeFilter("module")
  },
  servicesResults => servicesResults
);
