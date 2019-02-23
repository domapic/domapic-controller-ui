import React from "react";
import { plugins } from "reactive-data-source";

import { Component as SearchableList } from "src/components/searchable-list";
import { Component as Breadcrumbs } from "src/components/breadcrumbs";

import { pluginsCollection } from "src/data-layer/services";

const SORT_BY = ["name", "description"];

export const mapDataSourceToProps = () => ({
  loading: pluginsCollection.read.getters.loading,
  error: pluginsCollection.read.getters.error,
  header: <Breadcrumbs sections={[{ text: "Plugins", icon: "plug" }]} />,
  sortBy: SORT_BY[0],
  sortOrder: "asc",
  sortByChoices: SORT_BY
});

export const PluginsContainer = plugins.connect(mapDataSourceToProps)(SearchableList);
