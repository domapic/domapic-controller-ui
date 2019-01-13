import React from "react";
import { Route } from "react-router";
import { BrowserRouter, Redirect, Switch } from "react-router-dom";

import { SideBarLayoutRouter } from "./SideBarLayoutRouter";
import { SimpleLayoutRouter } from "./SimpleLayoutRouter";

import { config } from "src/config";
import { index, sectionsRoutesMatcher, defaultSection } from "src/config/routes";

export class MainRouter extends React.Component {
  render() {
    return (
      <BrowserRouter basename={config.baseRoute}>
        <Switch>
          <Redirect exact from={index} to={defaultSection} />
          <Route path={sectionsRoutesMatcher} component={SideBarLayoutRouter} />
          <Route component={SimpleLayoutRouter} />
        </Switch>
      </BrowserRouter>
    );
  }
}
