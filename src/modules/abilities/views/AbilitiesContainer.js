import { plugins } from "reactive-data-source";

import { Component as SearchableList } from "src/components/searchable-list";

import { abilitiesCollection } from "src/data-layer/services";

const SORT_BY = ["name", "description"];

export const mapDataSourceToProps = () => ({
  loading: abilitiesCollection.read.getters.loading,
  error: abilitiesCollection.read.getters.error,
  header: "Abilities",
  sortBy: SORT_BY[0],
  sortOrder: "asc",
  sortByChoices: SORT_BY
});

export const AbilitiesContainer = plugins.connect(mapDataSourceToProps)(SearchableList);
