import { plugins } from "reactive-data-source";

import { Component as SearchableList } from "src/components/searchable-list";

import { pluginsCollection } from "src/data-layer/services";

const SORT_BY = ["name", "description"];

export const mapDataSourceToProps = () => ({
  loading: pluginsCollection.read.getters.loading,
  error: pluginsCollection.read.getters.error,
  header: "Plugins",
  sortBy: SORT_BY[0],
  sortOrder: "asc",
  sortByChoices: SORT_BY
});

export const PluginsContainer = plugins.connect(mapDataSourceToProps)(SearchableList);
