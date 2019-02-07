import React from "react";
import PropTypes from "prop-types";

import { PluginsContainer } from "./views/PluginsContainer";
import { PluginsList } from "./views/PluginsList";
import { Plugin } from "./views/Plugin";

const SORT_BY = ["name", "description"];

export const PluginsLayout = ({ match }) => (
  <PluginsContainer
    baseUrl={match.url}
    header="Plugins"
    sortBy={SORT_BY[0]}
    sortOrder="asc"
    sortByChoices={SORT_BY}
  >
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
