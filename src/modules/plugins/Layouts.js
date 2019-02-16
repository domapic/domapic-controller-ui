import React from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";

import { PluginsContainer } from "./views/PluginsContainer";
import { PluginsList } from "./views/PluginsList";
import { Plugin } from "./views/Plugin";

export const PluginsLayout = ({ match }) => (
  <PluginsContainer baseUrl={match.url}>
    <PluginsList baseUrl={match.url} />
  </PluginsContainer>
);

PluginsLayout.propTypes = {
  match: PropTypes.any.isRequired
};

export const PluginLayout = ({ match }) => <Plugin id={match.params.id} />;

PluginLayout.propTypes = {
  match: PropTypes.any.isRequired
};

export const MainLayout = ({ match }) => (
  <Switch>
    <Route exact path={`${match.path}`} component={PluginsLayout} />
    <Route exact path={`${match.path}/:id`} component={PluginLayout} />
  </Switch>
);

MainLayout.propTypes = {
  match: PropTypes.any.isRequired
};
