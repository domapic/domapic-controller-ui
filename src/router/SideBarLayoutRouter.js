import React from "react";
import { Route } from "react-router";
import { Switch } from "react-router-dom";

import { SideBarLayout } from "src/ui-kit/layouts/sidebar/SideBarLayout";
import { Header } from "src/components/header/Header";
import { Menu } from "src/components/menu/Menu";

import { sectionsAsArray } from "src/config/sections";

export const SideBarRouter = () => (
  <Switch>
    {sectionsAsArray.map(section => (
      <Route key={section.route} path={section.route} component={section.component} />
    ))}
  </Switch>
);

export const SideBarLayoutRouter = () => (
  <SideBarLayout
    header={<Header />}
    menu={<Menu sections={sectionsAsArray} />}
    content={<SideBarRouter />}
  />
);
