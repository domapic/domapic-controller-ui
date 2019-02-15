import { plugins } from "reactive-data-source";

import { Component as ServicesList } from "src/components/services-list";

import { pluginsCollectionFilteredAndSorted } from "src/data-layer/services";

export const mapDataSourceToProps = ({ search, sortBy, sortOrder }) => ({
  list: pluginsCollectionFilteredAndSorted.filter({
    search,
    sortBy,
    reverse: sortOrder === "desc"
  }).read.getters.value
});

export const PluginsList = plugins.connect(mapDataSourceToProps)(ServicesList);
