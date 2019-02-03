import { plugins } from "reactive-data-source";

import { Component as ItemsList } from "src/components/items-list";

import { pluginsCollectionFilteredAndSorted } from "src/data-sources/services";

export const mapDataSourceToProps = ({ search, sortBy, sortOrder }) => ({
  list: pluginsCollectionFilteredAndSorted.filter({
    search,
    sortBy,
    reverse: sortOrder === "desc"
  }).read.getters.value
});

export const PluginsList = plugins.connect(mapDataSourceToProps)(ItemsList);
