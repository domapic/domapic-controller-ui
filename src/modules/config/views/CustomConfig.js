import { plugins } from "reactive-data-source";

import { Component as ConfigComponent } from "../components/config";

import { customConfig } from "src/data-layer/config";

export const mapDataSourceToProps = () => {
  return {
    config: customConfig.read.getters.value,
    error: customConfig.read.getters.error,
    loading: customConfig.read.getters.loading
  };
};

export const CustomConfig = plugins.connect(mapDataSourceToProps)(ConfigComponent);
