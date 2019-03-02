import React from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";

import { ModulesContainer } from "./views/ModulesContainer";
import { ModulesList } from "./views/ModulesList";
import { Module } from "./views/Module";

const ABILITIES = "abilities";
const INFO = "info";
const ROUTE_SEP = "/";

let config;

export const init = configuration => {
  config = configuration;
};

export const ModulesLayout = ({ match }) => (
  <ModulesContainer baseUrl={match.url}>
    <ModulesList baseUrl={match.url} />
  </ModulesContainer>
);

ModulesLayout.propTypes = {
  match: PropTypes.any.isRequired
};

export const ModuleLayout = ({ match }) => {
  const baseUrl = match.params.display
    ? match.url
        .split(ROUTE_SEP)
        .slice(0, -1)
        .join(ROUTE_SEP)
    : match.url;
  return (
    <Module
      id={match.params.id}
      display={match.params.display}
      abilitiesUrl={`${baseUrl}${ROUTE_SEP}${ABILITIES}`}
      abilitiesLinkBaseUrl={config.abilitiesBaseUrl}
      infoUrl={`${baseUrl}${ROUTE_SEP}${INFO}`}
    />
  );
};

ModuleLayout.propTypes = {
  match: PropTypes.any.isRequired
};

export const MainLayout = ({ match }) => (
  <Switch>
    <Route exact path={`${match.path}`} component={ModulesLayout} />
    <Route exact path={`${match.path}/:id/:display?`} component={ModuleLayout} />
  </Switch>
);

MainLayout.propTypes = {
  match: PropTypes.any.isRequired
};
