import { plugins } from "reactive-data-source";

import { Component as UserMenuComponent } from "src/components/menu-user";

import { login } from "src/data-layer/login";
import { userMeWithExtraData } from "src/data-layer/users";

const doLogout = event => {
  event.preventDefault();
  return login.logout();
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
