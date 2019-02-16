import { Selector } from "reactive-data-source";

import { searchByNameAndDescription, sortAndOrderBy } from "../helpers";
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

export const modulesCollectionFiltered = new Selector(
  modulesCollection,
  searchByNameAndDescription,
  []
);

export const pluginsCollectionFiltered = new Selector(
  pluginsCollection,
  searchByNameAndDescription,
  []
);

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
