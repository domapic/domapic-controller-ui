import React from "react";
import { Route } from "react-router";
import { Switch } from "react-router-dom";

import { SimpleLayout } from "src/ui-kit/layouts/simple/SimpleLayout";

import { routes } from "../routes";

export const SimpleRouter = () => (
  <Switch>
    <Route path={routes.login.route} component={routes.login.component} />
    <Route component={routes.notFound.component} />
  </Switch>
);

export const SimpleLayoutRouter = () => <SimpleLayout content={<SimpleRouter />} />;
