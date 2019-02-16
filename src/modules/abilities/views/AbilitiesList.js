import { plugins } from "reactive-data-source";

import { Component as AbilitiesListComponent } from "src/components/abilities-list";

import { abilitiesCollectionFilteredAndSorted } from "src/data-layer/services";

export const mapDataSourceToProps = ({ search, sortBy, sortOrder }) => ({
  abilities: abilitiesCollectionFilteredAndSorted.filter({
    search,
    sortBy,
    reverse: sortOrder === "desc"
  }).read.getters.value
});

export const AbilitiesList = plugins.connect(mapDataSourceToProps)(AbilitiesListComponent);
