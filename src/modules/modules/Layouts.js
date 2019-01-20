import React from "react";
import PropTypes from "prop-types";

import { Module } from "src/components/module/Module";
import { Modules } from "./views/Modules";

export const ModulesLayout = ({ match }) => <Modules baseUrl={match.url} />;

ModulesLayout.propTypes = {
  match: PropTypes.any.isRequired
};

export const ModuleLayout = ({ match }) => <Module id={match.params.id} />;

ModuleLayout.propTypes = {
  match: PropTypes.any.isRequired
};
