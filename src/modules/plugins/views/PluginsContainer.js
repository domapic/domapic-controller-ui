import { plugins } from "reactive-data-source";

import { Component as SearchableList } from "src/components/searchable-list";

import { pluginsCollection } from "src/data-sources/services";

export const mapDataSourceToProps = () => ({
  loading: pluginsCollection.read.getters.loading,
  error: pluginsCollection.read.getters.error
});

export const PluginsContainer = plugins.connect(mapDataSourceToProps)(SearchableList);
