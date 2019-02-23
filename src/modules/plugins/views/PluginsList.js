import { plugins } from "reactive-data-source";

import { Component as ServicesList } from "src/components/services-list";

import { pluginsCollectionFilteredAndSorted } from "src/data-layer/services";

export const mapDataSourceToProps = ({ search, sortBy, sortOrder }) => {
  const readList = pluginsCollectionFilteredAndSorted.filter({
    search,
    sortBy,
    reverse: sortOrder === "desc"
  }).read.getters;
  return {
    list: readList.value,
    listLoading: readList.loading
  };
};

export const PluginsList = plugins.connect(mapDataSourceToProps)(ServicesList);
