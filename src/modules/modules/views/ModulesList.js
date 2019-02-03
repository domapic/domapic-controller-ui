import { plugins } from "reactive-data-source";

import { Component as ItemsList } from "src/components/items-list";

import { modulesCollectionFilteredAndSorted } from "src/data-sources/services";

export const mapDataSourceToProps = ({ search, sortBy, sortOrder }) => ({
  list: modulesCollectionFilteredAndSorted.filter({
    search,
    sortBy,
    reverse: sortOrder === "desc"
  }).read.getters.value
});

export const ModulesList = plugins.connect(mapDataSourceToProps)(ItemsList);
