import { plugins } from "reactive-data-source";

import { Component as PluginComponent } from "src/components/plugin";

import { servicesModel } from "src/data-sources/services";

export const mapDataSourceToProps = ({ id }) => {
  const source = servicesModel.byId(id).read;
  return {
    plugin: source.getters.value,
    pluginLoading: source.getters.loading,
    pluginError: source.getters.error
  };
};

export const Plugin = plugins.connect(mapDataSourceToProps)(PluginComponent);
