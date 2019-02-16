import { plugins } from "reactive-data-source";

import { Component as ConfigComponent } from "../components/config";

import { baseConfig } from "src/data-layer/config";

export const mapDataSourceToProps = () => {
  return {
    config: baseConfig.read.getters.value,
    error: baseConfig.read.getters.error,
    loading: baseConfig.read.getters.loading
  };
};

export const BaseConfig = plugins.connect(mapDataSourceToProps)(ConfigComponent);
