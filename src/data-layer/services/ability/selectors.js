import { Selector } from "reactive-data-source";

import { byIdFilter } from "../../helpers";
import { modulesCollection } from "../services/selectors";
import { addAbilityExtraData } from "./helpers";

import { abilityModels } from "./origins";

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
