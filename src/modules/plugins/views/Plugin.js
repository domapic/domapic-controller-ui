import { plugins } from "reactive-data-source";

import { Component as PluginComponent } from "../components/plugin";

import { serviceModels } from "src/data-layer/services";

export const mapDataSourceToProps = ({ id }) => {
  const source = serviceModels.byId(id).read;
  return {
    plugin: source.getters.value,
    pluginLoading: source.getters.loading,
    pluginError: source.getters.error
  };
};

export const Plugin = plugins.connect(mapDataSourceToProps)(PluginComponent);
