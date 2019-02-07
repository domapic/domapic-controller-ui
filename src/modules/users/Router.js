import React from "react";
import { Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";

import { UsersLayout /*, UserLayout */ } from "./Layouts";

export const Router = ({ match }) => (
  <Switch>
    <Route exact path={`${match.path}`} component={UsersLayout} />
    {/* <Route exact path={`${match.path}/:id`} component={UserLayout} /> */}
  </Switch>
);

Router.propTypes = {
  match: PropTypes.any.isRequired
};
