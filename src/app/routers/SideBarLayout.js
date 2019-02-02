import React from "react";
import { Route } from "react-router";
import { Switch } from "react-router-dom";

import { Component as SideBarLayout } from "src/components/layout-sidebar";
import { Component as MenuSections } from "src/components/menu-sections";

import { Module as UserMenu } from "src/modules/menu-user";
import { Module as SettingsMenu } from "src/modules/menu-settings";
import { Module as HomeMenu } from "src/modules/menu-home";

import { sectionsAsArray, menuSectionsAsArray } from "../routes";

export const SideBarLayoutRouter = () => (
  <SideBarLayout
    menu={<MenuSections sections={menuSectionsAsArray} />}
    userMenu={UserMenu}
    settingsMenu={SettingsMenu}
    homeMenu={HomeMenu}
  >
    <Switch>
      {sectionsAsArray.map(section => (
        <Route key={section.route} path={section.route} component={section.component} />
      ))}
    </Switch>
  </SideBarLayout>
);
