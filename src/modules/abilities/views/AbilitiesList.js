import { plugins } from "reactive-data-source";

import { Module as AbilityCard } from "src/modules/ability-card";
import { Component as AbilitiesListComponent } from "src/components/abilities-list";

import { abilitiesCollectionFilteredAndSorted } from "src/data-layer/services";

export const mapDataSourceToProps = ({ search, sortBy, sortOrder }) => {
  const readAbilities = abilitiesCollectionFilteredAndSorted.filter({
    search,
    sortBy,
    reverse: sortOrder === "desc"
  }).read.getters;
  return {
    abilities: readAbilities.value,
    abilitiesLoading: readAbilities.loading,
    abilitiesError: readAbilities.error,
    AbilityCard
  };
};

export const AbilitiesList = plugins.connect(mapDataSourceToProps)(AbilitiesListComponent);
