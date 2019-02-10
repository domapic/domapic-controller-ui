import { plugins } from "reactive-data-source";

import { Component as UserComponent } from "src/components/user";

import { userMeIsAdmin, isValidUserName, isValidUserEmail } from "src/data-sources/users";
import { nonSystemRoles } from "src/data-sources/roles";

import { isUserNameRepeated, isUserEmailRepeated } from "./helpers";

export const mapDataSourceToProps = () => {
  return {
    currentUserIsAdmin: userMeIsAdmin.read.getters.value,
    roles: nonSystemRoles.read.getters.value,
    isUserEmailRepeated,
    isUserNameRepeated,
    isValidUserName,
    isValidUserEmail
  };
};

export const CreateUser = plugins.connect(mapDataSourceToProps)(UserComponent);
