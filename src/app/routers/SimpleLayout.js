import React from "react";
import { Route } from "react-router";
import { Switch } from "react-router-dom";

import { Component as SimpleLayout } from "src/components/layout-simple";
import { Component as ErrorComponent } from "src/components/error";

import { Module as Menu } from "src/modules/menu";

import { routes } from "../routes";

export const SimpleRouter = () => (
  <Switch>
    <Route exact path={routes.login.route} component={routes.login.component} />
    <Route exact path={routes.about.route} component={routes.about.component} />
    <Route render={() => <ErrorComponent>Not found</ErrorComponent>} />
  </Switch>
);

export const SimpleLayoutRouter = () => (
  <SimpleLayout Menu={Menu}>
    <SimpleRouter />
  </SimpleLayout>
);
