import { plugins } from "reactive-data-source";

import { Component as ServicesList } from "src/components/services-list";

import { modulesCollectionFilteredAndSorted } from "src/data-layer/services";

export const mapDataSourceToProps = ({ search, sortBy, sortOrder }) => ({
  list: modulesCollectionFilteredAndSorted.filter({
    search,
    sortBy,
    reverse: sortOrder === "desc"
  }).read.getters.value
});

export const ModulesList = plugins.connect(mapDataSourceToProps)(ServicesList);
