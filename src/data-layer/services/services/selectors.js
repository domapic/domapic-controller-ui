import { Selector } from "reactive-data-source";
import sortBy from "lodash.sortby";

import { servicesCollection } from "./origins";

import { typeFilter } from "./filters";

export const modulesCollection = new Selector(
  {
    source: servicesCollection,
    filter: () => typeFilter("module")
  },
  servicesResults => servicesResults,
  []
);

export const pluginsCollection = new Selector(
  {
    source: servicesCollection,
    filter: () => typeFilter("plugin")
  },
  servicesResults => servicesResults,
  []
);

const searchByNameAndDesc = (servicesResults, search) => {
  if (!search) {
    return servicesResults;
  }
  return servicesResults.filter(
    service => service.name.indexOf(search) > -1 || service.description.indexOf(search) > -1
  );
};

export const modulesCollectionFiltered = new Selector(modulesCollection, searchByNameAndDesc, []);
export const pluginsCollectionFiltered = new Selector(pluginsCollection, searchByNameAndDesc, []);

const sortAndOrderBy = (servicesResults, filter) => {
  const results = sortBy(servicesResults, (filter && filter.sortBy) || "name");
  if (filter.reverse) {
    return results.reverse();
  }
  return results;
};

export const modulesCollectionFilteredAndSorted = new Selector(
  {
    source: modulesCollectionFiltered,
    filter: ({ search }) => search
  },
  sortAndOrderBy,
  []
);

export const pluginsCollectionFilteredAndSorted = new Selector(
  {
    source: pluginsCollectionFiltered,
    filter: ({ search }) => search
  },
  sortAndOrderBy,
  []
);
