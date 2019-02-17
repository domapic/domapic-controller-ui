import { Selector } from "reactive-data-source";

import { byIdFilter } from "../../helpers";
import { modulesCollection } from "../services/selectors";

import { abilityModels } from "./origins";

export const abilityModelsWithExtraData = new Selector(
  {
    source: abilityModels,
    filter: id => byIdFilter(id)
  },
  modulesCollection,
  (abilityModel, modulesResults) => {
    return {
      ...abilityModel,
      serviceName: modulesResults.find(module => module._id === abilityModel._service).name
    };
  },
  {}
);

abilityModelsWithExtraData.addCustomFilter({
  byId: id => id
});
