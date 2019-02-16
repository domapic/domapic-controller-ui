import { plugins } from "reactive-data-source";

import { Component as UserComponent } from "src/components/user";

import {
  usersCollection,
  userMeIsAdmin,
  isValidUserName,
  isValidUserEmail,
  isUserNameRepeated,
  isUserEmailRepeated
} from "src/data-layer/users";
import { nonSystemRoles } from "src/data-layer/users";

export const mapDataSourceToProps = () => {
  return {
    currentUserIsAdmin: userMeIsAdmin.read.getters.value,
    roles: nonSystemRoles.read.getters.value,
    submitLoading: usersCollection.create.getters.loading,
    submitError: usersCollection.create.getters.error,
    isUserEmailRepeated,
    isUserNameRepeated,
    isValidUserName,
    isValidUserEmail
  };
};

export const CreateUser = plugins.connect(mapDataSourceToProps)(UserComponent);
