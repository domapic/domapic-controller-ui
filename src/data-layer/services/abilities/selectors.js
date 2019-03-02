import { Selector } from "reactive-data-source";

import { searchByNameAndDescription, sortAndOrderBy } from "../helpers";
import { modulesCollection } from "../services/selectors";
import { addAbilityExtraData } from "../ability/helpers";
import { ofService } from "./filters";
import { abilitiesCollection } from "./origins";

export const abilitiesCollectionWithExtraData = new Selector(
  {
    source: abilitiesCollection,
    filter: serviceId => ofService(serviceId)
  },
  modulesCollection,
  (abilitiesCollectionResults, modulesCollectionResults) => {
    return abilitiesCollectionResults.map(ability => {
      return addAbilityExtraData(ability, modulesCollectionResults);
    });
  },
  []
);

abilitiesCollectionWithExtraData.addCustomFilter({
  ofService: serviceId => serviceId
});

export const abilitiesCollectionFiltered = new Selector(
  abilitiesCollectionWithExtraData,
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
