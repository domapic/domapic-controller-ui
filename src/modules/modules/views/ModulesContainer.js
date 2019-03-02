import React from "react";
import { plugins } from "reactive-data-source";

import { Component as SearchableList } from "src/components/searchable-list";
import { Component as Breadcrumbs } from "src/components/breadcrumbs";

import { modulesCollection } from "src/data-layer/services";

const SORT_BY = ["name", "description"];

export const mapDataSourceToProps = () => ({
  loading: modulesCollection.read.getters.loading,
  header: <Breadcrumbs sections={[{ text: "Modules", icon: "cube" }]} />,
  error: modulesCollection.read.getters.error,
  sortBy: SORT_BY[0],
  sortOrder: "asc",
  sortByChoices: SORT_BY
});

export const ModulesContainer = plugins.connect(mapDataSourceToProps)(SearchableList);
