import { plugins } from "reactive-data-source";

import { Component as ModuleComponent } from "src/components/module";

import { servicesModel } from "src/data-layer/services";
import { abilitiesCollection } from "src/data-layer/abilities";

export const mapDataSourceToProps = ({ id }) => {
  const module = servicesModel.byId(id).read;
  const abilities = abilitiesCollection.ofService(id).read;
  return {
    abilities: abilities.getters.value,
    abilitiesError: abilities.getters.error,
    abilitiesLoading: abilities.getters.loading,
    module: module.getters.value,
    moduleError: module.getters.error,
    moduleLoading: module.getters.loading
  };
};

export const Module = plugins.connect(mapDataSourceToProps)(ModuleComponent);
