import { plugins } from "reactive-data-source";

import { Component as ServicesList } from "src/components/services-list";

import { modulesCollectionFilteredAndSorted } from "src/data-layer/services";

export const mapDataSourceToProps = ({ search, sortBy, sortOrder }) => {
  const readList = modulesCollectionFilteredAndSorted.filter({
    search,
    sortBy,
    reverse: sortOrder === "desc"
  }).read.getters;
  return {
    list: readList.value,
    listLoading: readList.loading
  };
};

export const ModulesList = plugins.connect(mapDataSourceToProps)(ServicesList);
