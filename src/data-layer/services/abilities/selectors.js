import { Selector } from "reactive-data-source";

import { searchByNameAndDescription, sortAndOrderBy } from "../helpers";
import { abilitiesCollection } from "./origins";

export const abilitiesCollectionFiltered = new Selector(
  abilitiesCollection,
  searchByNameAndDescription,
  []
);

export const abilitiesCollectionFilteredAndSorted = new Selector(
  {
    source: abilitiesCollectionFiltered,
    filter: ({ search }) => search
  },
  sortAndOrderBy,
  []
);
