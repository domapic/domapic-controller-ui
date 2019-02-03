import React from "react";
import { Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";

import { PluginsLayout, PluginLayout } from "./Layouts";

export const Router = ({ match }) => (
  <Switch>
    <Route exact path={`${match.path}`} component={PluginsLayout} />
    <Route exact path={`${match.path}/:id`} component={PluginLayout} />
  </Switch>
);

Router.propTypes = {
  match: PropTypes.any.isRequired
};
