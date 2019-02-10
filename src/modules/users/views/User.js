import { plugins } from "reactive-data-source";

import { Component as UserComponent } from "src/components/user";

import { usersModelWithExtraData, userAllowedRoles, userMeIsAdmin } from "src/data-sources/users";
// import { roles } from "src/data-sources/roles";

export const mapDataSourceToProps = ({ id }) => {
  const source = usersModelWithExtraData.byId(id).read;
  return {
    currentUserIsAdmin: userMeIsAdmin.read.getters.value,
    roles: userAllowedRoles.filter(id).read.getters.value,
    user: source.getters.value,
    loading: source.getters.loading,
    error: source.getters.error
  };
};

export const User = plugins.connect(mapDataSourceToProps)(UserComponent);
