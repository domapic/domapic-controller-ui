import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { UsersContainer } from "./views/UsersContainer";
import { UsersList } from "./views/UsersList";

import { Component as UsersListTogglable } from "src/components/users-list-togglable";
import { CreateOrUpdateUser } from "./views/CreateOrUpdateUser";

// LIST USERS

const SORT_BY = ["name", "email", "role"];

export const UsersLayoutBase = ({ history, match }) => (
  <UsersListTogglable
    usersContainer={UsersContainer}
    usersList={UsersList}
    sortByChoices={SORT_BY}
    baseUrl={match.url}
    onClickUser={userId => history.push(`${match.url}/${userId}`)}
    onClickNew={() => history.push(`${match.url}/create`)}
  />
);

UsersLayoutBase.propTypes = {
  history: PropTypes.any,
  match: PropTypes.any.isRequired
};

export const UsersLayout = withRouter(UsersLayoutBase);

// UPDATE USER

export const UpdateUserLayoutBase = ({ match, history }) => (
  <CreateOrUpdateUser id={match.params.id} history={history} goBack={() => history.goBack()} />
);

UpdateUserLayoutBase.propTypes = {
  history: PropTypes.any,
  match: PropTypes.any.isRequired
};

export const UpdateUserLayout = withRouter(UpdateUserLayoutBase);

// CREATE USER

export const CreateUserLayoutBase = ({ history }) => (
  <CreateOrUpdateUser history={history} goBack={() => history.goBack()} />
);

CreateUserLayoutBase.propTypes = {
  history: PropTypes.any
};

export const CreateUserLayout = withRouter(CreateUserLayoutBase);
