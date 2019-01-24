import React from "react";
import { Route } from "react-router";
import { Switch } from "react-router-dom";

import { Component as SimpleLayout } from "src/components/layout-simple";
import { Component as ErrorComponent } from "src/components/error";

import { routes } from "../routes";

export const SimpleRouter = () => (
  <Switch>
    <Route path={routes.login.route} component={routes.login.component} />
    <Route render={() => <ErrorComponent message="Not found" />} />
  </Switch>
);

export const SimpleLayoutRouter = () => (
  <SimpleLayout>
    <SimpleRouter />
  </SimpleLayout>
);
