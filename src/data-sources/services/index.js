import { origins, Selector } from "reactive-data-source";

// SERVICES COLLECTION

const typeFilter = serviceType => {
  if (serviceType && serviceType.length) {
    return {
      query: {
        type: serviceType
      }
    };
  }
};

export const servicesCollection = new origins.Api(
  "/services",
  {},
  {
    defaultValue: []
  }
);

servicesCollection.addCustomFilter({
  type: typeFilter
});

// SELECTORS

export const modulesCollection = new Selector(
  {
    source: servicesCollection,
    filter: () => typeFilter("module")
  },
  servicesResults => servicesResults,
  []
);

// SERVICE MODEL

const byIdFilter = id => {
  if (id) {
    return {
      params: {
        id
      }
    };
  }
};

export const servicesModel = new origins.Api(
  "/services/:id",
  {},
  {
    defaultValue: {}
  }
);

servicesModel.addCustomFilter({
  byId: byIdFilter
});
