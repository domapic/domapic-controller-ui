import React from "react";
import { Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";

import { ModulesLayout, ModuleLayout } from "./Layouts";

export const Router = ({ match }) => (
  <Switch>
    <Route exact path={`${match.path}`} component={ModulesLayout} />
    <Route exact path={`${match.path}/:id`} component={ModuleLayout} />
  </Switch>
);

Router.propTypes = {
  match: PropTypes.any.isRequired
};
