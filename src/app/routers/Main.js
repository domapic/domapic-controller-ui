import React from "react";
import { Route } from "react-router";
import { Router, Redirect, Switch } from "react-router-dom";

import { SideBarLayoutRouter } from "./SideBarLayout";
import { SimpleLayoutRouter } from "./SimpleLayout";

import { routes, sectionsRoutesMatcher } from "../routes";

export class MainRouter extends React.Component {
  render() {
    return (
      <Router basename={routes.index.route} history={this.props.history}>
        <Switch>
          <Redirect exact from={routes.index.route} to={routes.index.redirectTo} />
          <Route path={sectionsRoutesMatcher} component={SideBarLayoutRouter} />
          <Route component={SimpleLayoutRouter} />
        </Switch>
      </Router>
    );
  }
}
