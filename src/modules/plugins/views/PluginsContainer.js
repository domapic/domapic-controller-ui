import { plugins } from "reactive-data-source";

import { Component as Services } from "src/components/services";

import { pluginsCollection } from "src/data-sources/services";

export const mapDataSourceToProps = () => ({
  loading: pluginsCollection.read.getters.loading,
  error: pluginsCollection.read.getters.error
});

export const PluginsContainer = plugins.connect(mapDataSourceToProps)(Services);
