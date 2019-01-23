import React from "react";
import { Route } from "react-router";
import { Switch } from "react-router-dom";

import { Component as SideBarLayout } from "src/components/layout-sidebar";
import { Component as Menu } from "src/components/menu";

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
