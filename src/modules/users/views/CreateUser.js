import { pickBy, identity } from "lodash";

import { plugins } from "reactive-data-source";

import { Component as UserComponent } from "src/components/user";

import {
  usersCollection,
  userMeIsAdmin,
  isValidUserName,
  isValidUserEmail
} from "src/data-sources/users";
import { nonSystemRoles } from "src/data-sources/roles";

const createUser = userData => usersCollection.create(pickBy(userData, identity));

export const mapDataSourceToProps = () => {
  const submitUser = usersCollection.create;
  return {
    currentUserIsAdmin: userMeIsAdmin.read.getters.value,
    roles: nonSystemRoles.read.getters.value,
    onSubmit: createUser,
    submitLoading: submitUser.getters.loading,
    submitError: submitUser.getters.error,
    isNew: true,
    user: {},
    isValidUserName,
    isValidUserEmail
  };
};

export const CreateUser = plugins.connect(mapDataSourceToProps)(UserComponent);
