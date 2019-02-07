import { plugins } from "reactive-data-source";

import { Component as SearchableList } from "src/components/searchable-list";

import { usersCollection } from "src/data-sources/users";

export const mapDataSourceToProps = () => ({
  loading: usersCollection.read.getters.loading,
  error: usersCollection.read.getters.error
});

export const UsersContainer = plugins.connect(mapDataSourceToProps)(SearchableList);
