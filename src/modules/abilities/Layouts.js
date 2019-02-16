import React from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";

import { AbilitiesContainer } from "./views/AbilitiesContainer";
import { AbilitiesList } from "./views/AbilitiesList";
import { Ability } from "./views/Ability";

const ACTIVITY = "activity";
const INFO = "info";
const ROUTE_SEP = "/";

export const AbilitiesLayout = ({ match }) => (
  <AbilitiesContainer>
    <AbilitiesList baseUrl={match.url} />
  </AbilitiesContainer>
);

AbilitiesLayout.propTypes = {
  match: PropTypes.any.isRequired
};

export const AbilityLayout = ({ match }) => {
  const baseUrl = match.params.display
    ? match.url
        .split(ROUTE_SEP)
        .slice(0, -1)
        .join(ROUTE_SEP)
    : match.url;
  return (
    <Ability
      id={match.params.id}
      display={match.params.display}
      activityUrl={`${baseUrl}${ROUTE_SEP}${ACTIVITY}`}
      infoUrl={`${baseUrl}${ROUTE_SEP}${INFO}`}
    />
  );
};

AbilityLayout.propTypes = {
  match: PropTypes.any.isRequired
};

export const MainLayout = ({ match }) => (
  <Switch>
    <Route exact path={`${match.path}`} component={AbilitiesLayout} />
    <Route exact path={`${match.path}/:id/:display?`} component={AbilityLayout} />
  </Switch>
);

MainLayout.propTypes = {
  match: PropTypes.any.isRequired
};
