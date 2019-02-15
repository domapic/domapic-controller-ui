import { plugins } from "reactive-data-source";

import { Component as UsersListComponent } from "src/components/users-list";
import { usersCollectionFilteredAndSorted } from "src/data-layer/users";

import { UserAvatar } from "./UserAvatar";

export const mapDataSourceToProps = ({ search, sortBy, sortOrder, showSystem }) => {
  return {
    UserAvatar,
    users: usersCollectionFilteredAndSorted.filter({
      search,
      sortBy,
      reverse: sortOrder === "desc",
      showSystem
    }).read.getters.value
  };
};

export const UsersList = plugins.connect(mapDataSourceToProps)(UsersListComponent);
