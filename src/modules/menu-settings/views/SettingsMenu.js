import { plugins } from "reactive-data-source";

import { Component as SettingsMenuComponent } from "src/components/menu-settings";

import { userIsAdmin } from "src/data-sources/users";

export const mapDataSourceToProps = () => {
  return {
    userIsAdmin: userIsAdmin.read.getters.value
  };
};

export const SettingsMenu = plugins.connect(mapDataSourceToProps)(SettingsMenuComponent);
