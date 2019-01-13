import React from "react";
import { Route } from "react-router";
import { Switch } from "react-router-dom";

import { SimpleLayout } from "src/ui-kit/layouts/simple/SimpleLayout";
import { Header } from "src/components/header/Header";

import { Login } from "src/components/login/Login";
import { NotFound } from "src/components/not-found/NotFound";

import { routes } from "src/config/routes";

export const SimpleRouter = () => (
  <Switch>
    <Route path={routes.login} component={Login} />
    <Route component={NotFound} />
  </Switch>
);

export const SimpleLayoutRouter = () => (
  <SimpleLayout header={<Header />} content={<SimpleRouter />} />
);
