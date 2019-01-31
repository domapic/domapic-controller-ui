import { plugins } from "reactive-data-source";

import { Component as UserMenuComponent } from "src/components/menu-user";

import { authSession } from "src/data-sources/authentication";
import { logout, cleanAll } from "src/data-sources/setup";
import { userMe } from "src/data-sources/users";

const doLogout = event => {
  event.preventDefault();
  logout();
  return authSession.delete().then(cleanAll);
};

export const mapDataSourceToProps = () => {
  return {
    doLogout,
    loading: userMe.read.getters.loading,
    error: userMe.read.getters.error,
    user: userMe.read.getters.value
  };
};

export const UserMenu = plugins.connect(mapDataSourceToProps)(UserMenuComponent);
