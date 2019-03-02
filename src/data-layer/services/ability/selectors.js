import { Selector } from "reactive-data-source";

import { byIdFilter } from "../../helpers";
import { modulesCollection } from "../services/selectors";
import { addAbilityExtraData } from "./helpers";

import { abilityModels, abilityStates } from "./origins";

export const abilityModelsWithExtraData = new Selector(
  {
    source: abilityModels,
    filter: id => byIdFilter(id)
  },
  modulesCollection,
  (abilityModel, modulesResults) => {
    return addAbilityExtraData(abilityModel, modulesResults);
  },
  {}
);

abilityModelsWithExtraData.addCustomFilter({
  byId: id => id
});

export const abilityStatesLoaded = new Selector(
  {
    source: abilityStates,
    filter: id => byIdFilter(id)
  },
  () => {
    return true;
  },
  false
);

abilityStatesLoaded.addCustomFilter({
  byId: id => id
});
