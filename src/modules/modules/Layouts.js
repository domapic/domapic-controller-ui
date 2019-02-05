import React from "react";
import PropTypes from "prop-types";

import { ModulesContainer } from "./views/ModulesContainer";
import { ModulesList } from "./views/ModulesList";
import { Module } from "./views/Module";

const ABILITIES = "abilities";
const INFO = "info";
const ROUTE_SEP = "/";

let config = {
  abilitiesBaseUrl: ""
};

export const setup = configuration => {
  config = { ...config, ...configuration };
};

export const ModulesLayout = ({ match }) => (
  <ModulesContainer baseUrl={match.url} header="Modules">
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
