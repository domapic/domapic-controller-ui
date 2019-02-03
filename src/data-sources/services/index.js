import { origins, Selector } from "reactive-data-source";
import sortBy from "lodash.sortby";

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

export const modulesCollectionFiltered = new Selector(
  modulesCollection,
  (modulesResults, search) => {
    if (!search) {
      return modulesResults;
    }
    return modulesResults.filter(
      module => module.name.indexOf(search) > -1 || module.description.indexOf(search) > -1
    );
  },
  []
);

export const modulesCollectionFilteredAndSorted = new Selector(
  {
    source: modulesCollectionFiltered,
    filter: ({ search }) => search
  },
  (modulesResults, filter) => {
    const results = sortBy(modulesResults, (filter && filter.sortBy) || "name");
    if (filter.reverse) {
      return results.reverse();
    }
    return results;
  },
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
