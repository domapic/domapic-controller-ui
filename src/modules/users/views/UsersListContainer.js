import { plugins } from "reactive-data-source";

import { Component as UsersListContainerComponent } from "../components/users-list-container";
import { usersCollection } from "src/data-layer/users";

import { UsersList } from "./UsersList";

const SORT_BY = ["name", "email", "role"];

export const mapDataSourceToProps = () => {
  return {
    UsersList,
    loading: usersCollection.read.getters.loading,
    error: usersCollection.read.getters.error,
    sortByChoices: SORT_BY
  };
};

export const UsersListContainer = plugins.connect(mapDataSourceToProps)(
  UsersListContainerComponent
);
