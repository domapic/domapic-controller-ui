import React from "react";
import { Route } from "react-router";
import { Switch } from "react-router-dom";

import { Component as SimpleLayout } from "src/components/layout-simple";

import { routes } from "../routes";

export const SimpleRouter = () => (
  <Switch>
    <Route path={routes.login.route} component={routes.login.component} />
    <Route component={routes.notFound.component} />
  </Switch>
);

export const SimpleLayoutRouter = () => (
  <SimpleLayout>
    <SimpleRouter />
  </SimpleLayout>
);
