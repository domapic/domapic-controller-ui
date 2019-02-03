import { plugins } from "reactive-data-source";

import { Component as PluginComponent } from "src/components/module";

import { servicesModel } from "src/data-sources/services";

export const mapDataSourceToProps = ({ id }) => {
  const source = servicesModel.byId(id).read;
  return {
    module: source.getters.value,
    loading: source.getters.loading,
    error: source.getters.error
  };
};

export const Plugin = plugins.connect(mapDataSourceToProps)(PluginComponent);
