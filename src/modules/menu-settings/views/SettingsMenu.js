import { plugins } from "reactive-data-source";

import { Component as SettingsMenuComponent } from "src/components/menu-settings";

import { userMeIsAdmin } from "src/data-sources/users";

export const mapDataSourceToProps = () => {
  return {
    userMeIsAdmin: userMeIsAdmin.read.getters.value
  };
};

export const SettingsMenu = plugins.connect(mapDataSourceToProps)(SettingsMenuComponent);
