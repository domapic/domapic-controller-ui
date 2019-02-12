import { plugins } from "reactive-data-source";

import { Component as UserMenuComponent } from "src/components/menu-user";

import { authSession } from "src/data-sources/authentication";
import { logout, cleanAll } from "src/data-sources/setup";
import { userMeWithExtraData } from "src/data-sources/users";

const doLogout = event => {
  event.preventDefault();
  logout();
  return authSession.delete().then(cleanAll);
};

export const mapDataSourceToProps = () => {
  return {
    doLogout,
    loading: userMeWithExtraData.read.getters.loading,
    error: userMeWithExtraData.read.getters.error,
    user: userMeWithExtraData.read.getters.value
  };
};

export const UserMenu = plugins.connect(mapDataSourceToProps)(UserMenuComponent);
