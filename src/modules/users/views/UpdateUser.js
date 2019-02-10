import { pickBy, identity } from "lodash";

import { plugins } from "reactive-data-source";

import { Component as UserComponent } from "src/components/user";

import {
  usersModels,
  usersModelsWithExtraData,
  userAllowedRoles,
  userMeIsAdmin,
  isValidUserName,
  isValidUserEmail
} from "src/data-sources/users";

import { isUserNameRepeated, isUserEmailRepeated } from "./helpers";

const updateUser = (userData, id) => usersModels.byId(id).update(pickBy(userData, identity));

export const mapDataSourceToProps = ({ id }) => {
  const user = usersModelsWithExtraData.byId(id).read;
  const submitUser = usersModels.byId(id).update;
  return {
    currentUserIsAdmin: userMeIsAdmin.read.getters.value,
    roles: userAllowedRoles.byId(id).read.getters.value,
    onSubmit: updateUser,
    submitLoading: submitUser.getters.loading,
    submitError: submitUser.getters.error,
    user: user.getters.value,
    userLoading: user.getters.loading,
    userError: user.getters.error,
    isUserNameRepeated,
    isUserEmailRepeated,
    isValidUserName,
    isValidUserEmail
  };
};

export const UpdateUser = plugins.connect(mapDataSourceToProps)(UserComponent);
