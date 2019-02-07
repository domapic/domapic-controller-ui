import { plugins } from "reactive-data-source";

import { Component as UserComponent } from "src/components/user";

import { usersModel } from "src/data-sources/users";

export const mapDataSourceToProps = ({ id }) => {
  const source = usersModel.byId(id).read;
  return {
    user: source.getters.value,
    userLoading: source.getters.loading,
    userError: source.getters.error
  };
};

export const User = plugins.connect(mapDataSourceToProps)(UserComponent);
