import React from "react";
import { plugins } from "reactive-data-source";

import { Component as SearchableList } from "src/components/searchable-list";
import { Component as Breadcrumbs } from "src/components/breadcrumbs";

import { abilitiesCollection } from "src/data-layer/services";

const SORT_BY = ["name", "description"];

export const mapDataSourceToProps = () => ({
  error: abilitiesCollection.read.getters.error,
  header: <Breadcrumbs sections={[{ text: "Abilities", icon: "bolt" }]} />,
  sortBy: SORT_BY[0],
  sortOrder: "asc",
  sortByChoices: SORT_BY
});

export const AbilitiesContainer = plugins.connect(mapDataSourceToProps)(SearchableList);
