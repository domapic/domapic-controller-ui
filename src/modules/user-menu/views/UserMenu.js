import { plugins } from "reactive-data-source";

import { Component as UserMenuComponent } from "src/components/menu-user";

import { authSession } from "src/data-sources/authentication";
import { logout, cleanAll } from "src/data-sources/setup";
import { userMeWithAvatar } from "src/data-sources/users";

const doLogout = event => {
  event.preventDefault();
  logout();
  return authSession.delete().then(cleanAll);
};

export const mapDataSourceToProps = () => {
  return {
    doLogout,
    loading: userMeWithAvatar.read.getters.loading,
    error: userMeWithAvatar.read.getters.error,
    user: userMeWithAvatar.read.getters.value
  };
};

export const UserMenu = plugins.connect(mapDataSourceToProps)(UserMenuComponent);
