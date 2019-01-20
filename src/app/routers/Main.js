import React from "react";
import { Route } from "react-router";
import { BrowserRouter, Redirect, Switch } from "react-router-dom";

import { SideBarLayoutRouter } from "./SideBarLayout";
import { SimpleLayoutRouter } from "./SimpleLayout";

import { routes, sectionsRoutesMatcher } from "../routes";

export class MainRouter extends React.Component {
  render() {
    return (
      <BrowserRouter basename={routes.index.route}>
        <Switch>
          <Redirect exact from={routes.index.route} to={routes.index.redirectTo} />
          <Route path={sectionsRoutesMatcher} component={SideBarLayoutRouter} />
          <Route component={SimpleLayoutRouter} />
        </Switch>
      </BrowserRouter>
    );
  }
}
