import { pickBy, identity } from "lodash";

import { plugins } from "reactive-data-source";

import { Component as UserComponent } from "src/components/user";

import {
  userModels,
  userModelsWithExtraData,
  userAllowedRoles,
  userMeIsAdmin,
  isValidUserName,
  isValidUserEmail,
  isUserNameRepeated,
  isUserEmailRepeated
} from "src/data-layer/users";

export const mapDataSourceToProps = ({ id, deleting }) => {
  const readUser = userModelsWithExtraData.byId(id).read;
  const user = userModels.byId(id);
  const updateUser = user.update;
  const deleteUser = user.delete;

  const submitUpdateUser = userData => updateUser(pickBy(userData, identity));

  return {
    currentUserIsAdmin: userMeIsAdmin.read.getters.value,
    roles: deleting ? [] : userAllowedRoles.byId(id).read.getters.value,
    onSubmit: submitUpdateUser,
    submitLoading: updateUser.getters.loading,
    submitError: updateUser.getters.error,
    user: deleting ? {} : readUser.getters.value,
    userLoading: deleting ? true : readUser.getters.loading,
    userError: deleting ? deleteUser.getters.error : readUser.getters.error,
    userDeleteLoading: deleteUser.getters.loading,
    userDeleteError: deleteUser.getters.error,
    isUserNameRepeated,
    isUserEmailRepeated,
    isValidUserName,
    isValidUserEmail
  };
};

export const UpdateUser = plugins.connect(mapDataSourceToProps)(UserComponent);
