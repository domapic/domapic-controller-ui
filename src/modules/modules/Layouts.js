import React from "react";
import PropTypes from "prop-types";

import { ModulesContainer } from "./views/ModulesContainer";
import { ModulesList } from "./views/ModulesList";
import { Module } from "./views/Module";

export const ModulesLayout = ({ match }) => (
  <ModulesContainer baseUrl={match.url} header="Modules">
    <ModulesList baseUrl={match.url} />
  </ModulesContainer>
);

ModulesLayout.propTypes = {
  match: PropTypes.any.isRequired
};

export const ModuleLayout = ({ match }) => <Module id={match.params.id} />;

ModuleLayout.propTypes = {
  match: PropTypes.any.isRequired
};
