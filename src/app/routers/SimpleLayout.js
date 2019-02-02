import React from "react";
import { Route } from "react-router";
import { Switch } from "react-router-dom";

import { Component as SimpleLayout } from "src/components/layout-simple";
import { Component as ErrorComponent } from "src/components/error";

import { Module as HomeMenu } from "src/modules/menu-home";

import { routes } from "../routes";

export const SimpleRouter = () => (
  <Switch>
    <Route exact path={routes.login.route} component={routes.login.component} />
    <Route exact path={routes.packageInfo.route} component={routes.packageInfo.component} />
    <Route render={() => <ErrorComponent message="Not found" />} />
  </Switch>
);

export const SimpleLayoutRouter = () => (
  <SimpleLayout homeMenu={HomeMenu}>
    <SimpleRouter />
  </SimpleLayout>
);
