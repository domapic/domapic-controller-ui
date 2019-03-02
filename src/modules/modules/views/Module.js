import { plugins } from "reactive-data-source";

import { Component as ModuleComponent } from "../components/module";
import { Module as AbilityCard } from "src/modules/ability-card";

import { serviceModels } from "src/data-layer/services";
import { abilitiesCollectionWithExtraData } from "src/data-layer/services";

export const mapDataSourceToProps = ({ id }) => {
  const module = serviceModels.byId(id).read;
  const abilities = abilitiesCollectionWithExtraData.ofService(id).read;
  return {
    abilities: abilities.getters.value,
    abilitiesError: abilities.getters.error,
    abilitiesLoading: abilities.getters.loading,
    module: module.getters.value,
    moduleError: module.getters.error,
    moduleLoading: module.getters.loading,
    AbilityCard
  };
};

export const Module = plugins.connect(mapDataSourceToProps)(ModuleComponent);
