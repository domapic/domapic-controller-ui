import { pickBy, identity } from "lodash";

import { plugins } from "reactive-data-source";

import { Component as UserComponent } from "src/components/user";

import {
  usersModels,
  usersModelsWithExtraData,
  userAllowedRoles,
  userMeIsAdmin,
  isValidUserName,
  isValidUserEmail,
  isUserNameRepeated,
  isUserEmailRepeated
} from "src/data-layer/users";

export const mapDataSourceToProps = ({ id }) => {
  const readUser = usersModelsWithExtraData.byId(id).read;
  const user = usersModels.byId(id);
  const updateUser = user.update;
  const deleteUser = user.delete;

  const submitUpdateUser = userData => updateUser(pickBy(userData, identity));

  return {
    currentUserIsAdmin: userMeIsAdmin.read.getters.value,
    roles: userAllowedRoles.byId(id).read.getters.value,
    onSubmit: submitUpdateUser,
    submitLoading: updateUser.getters.loading,
    submitError: updateUser.getters.error,
    user: readUser.getters.value,
    userLoading: readUser.getters.loading,
    userError: readUser.getters.error,
    userDeleteLoading: deleteUser.getters.loading,
    userDeleteError: deleteUser.getters.error,
    isUserNameRepeated,
    isUserEmailRepeated,
    isValidUserName,
    isValidUserEmail
  };
};

export const UpdateUser = plugins.connect(mapDataSourceToProps)(UserComponent);
