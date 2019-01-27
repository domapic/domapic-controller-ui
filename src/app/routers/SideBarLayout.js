import React from "react";
import { Route } from "react-router";
import { Switch } from "react-router-dom";

import { Component as SideBarLayout } from "src/components/layout-sidebar";
import { Component as MenuSections } from "src/components/menu-sections";

import { sectionsAsArray, menuSectionsAsArray } from "../routes";

export const SideBarLayoutRouter = () => (
  <SideBarLayout menu={<MenuSections sections={menuSectionsAsArray} />}>
    <Switch>
      {sectionsAsArray.map(section => (
        <Route key={section.route} path={section.route} component={section.component} />
      ))}
    </Switch>
  </SideBarLayout>
);
