import { pickBy, identity } from "lodash";

import { plugins } from "reactive-data-source";

import { Component as UserComponent } from "src/components/user";

import {
  usersModels,
  usersModelsWithExtraData,
  userAllowedRoles,
  userMeIsAdmin
} from "src/data-sources/users";

const updateUser = (id, userData) => usersModels.byId(id).update(pickBy(userData, identity));

export const mapDataSourceToProps = ({ id }) => {
  const user = usersModelsWithExtraData.byId(id).read;
  const submitUser = usersModels.byId(id).update;
  return {
    currentUserIsAdmin: userMeIsAdmin.read.getters.value,
    roles: userAllowedRoles.byId(id).read.getters.value,
    submit: updateUser,
    submitLoading: submitUser.getters.loading,
    submitError: submitUser.getters.error,
    user: user.getters.value,
    userLoading: user.getters.loading,
    userError: user.getters.error
  };
};

export const User = plugins.connect(mapDataSourceToProps)(UserComponent);
