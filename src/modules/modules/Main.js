import React from "react";
import { Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";

import { ModulesLayout } from "./Layouts";
import { ModuleLayout } from "./Layouts";

export const Main = ({ match }) => (
  <Switch>
    <Route exact path={`${match.path}`} component={ModulesLayout} />
    <Route exact path={`${match.path}/:id`} component={ModuleLayout} />
  </Switch>
);

Main.propTypes = {
  match: PropTypes.any.isRequired
};
