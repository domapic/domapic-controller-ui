import React from "react";
import { Route } from "react-router";
import { Switch } from "react-router-dom";

import { SideBarLayout } from "src/ui-kit/layouts/sidebar/SideBarLayout";
import { Menu } from "src/components/menu/Menu";

import { sectionsAsArray } from "../routes";

export const SideBarLayoutRouter = () => (
  <SideBarLayout menu={<Menu sections={sectionsAsArray} />}>
    <Switch>
      {sectionsAsArray.map(section => (
        <Route key={section.route} path={section.route} component={section.component} />
      ))}
    </Switch>
  </SideBarLayout>
);
