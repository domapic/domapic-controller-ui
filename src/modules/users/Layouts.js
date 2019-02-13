import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { UsersListContainer } from "./views/UsersListContainer";
import { CreateOrUpdateUser } from "./views/CreateOrUpdateUser";

// LIST USERS

export const UsersListLayoutBase = ({ history, match }) => (
  <UsersListContainer
    baseUrl={match.url}
    onClickUser={userId => history.push(`${match.url}/${userId}`)}
    onClickNew={() => history.push(`${match.url}/create`)}
  />
);

UsersListLayoutBase.propTypes = {
  history: PropTypes.any,
  match: PropTypes.any.isRequired
};

export const UsersListLayout = withRouter(UsersListLayoutBase);

// CREATE OR UPDATE USER

export const CreateOrUpdateUserLayoutBase = ({ history, match }) => (
  <CreateOrUpdateUser id={match.params.id} goBack={() => history.goBack()} />
);

CreateOrUpdateUserLayoutBase.propTypes = {
  history: PropTypes.any,
  match: PropTypes.any.isRequired
};

export const CreateOrUpdateUserLayout = withRouter(CreateOrUpdateUserLayoutBase);

export const MainLayout = ({ match }) => (
  <Switch>
    <Route exact path={`${match.path}`} component={UsersListLayout} />
    <Route exact path={`${match.path}/create`} component={CreateOrUpdateUserLayout} />
    <Route exact path={`${match.path}/:id`} component={CreateOrUpdateUserLayout} />
  </Switch>
);

MainLayout.propTypes = {
  match: PropTypes.any.isRequired
};
