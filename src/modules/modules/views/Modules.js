import { plugins } from "reactive-data-source";

import { Component as ModulesComponent } from "src/components/modules";

import { modulesCollection } from "src/data-sources/services";

export const mapDataSourceToProps = () => ({
  modules: modulesCollection.read.getters.value,
  loading: modulesCollection.read.getters.loading,
  error: modulesCollection.read.getters.error
});

export const Modules = plugins.connect(mapDataSourceToProps)(ModulesComponent);
