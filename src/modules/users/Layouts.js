import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { UsersContainer } from "./views/UsersContainer";
import { UsersList } from "./views/UsersList";

import { Component as UsersListTogglable } from "src/components/users-list-togglable";
import { User } from "./views/User";

const SORT_BY = ["name", "email", "role"];

export class UsersLayoutBase extends Component {
  constructor() {
    super();
    this.onClickUser = this.onClickUser.bind(this);
  }

  onClickUser(userId) {
    this.props.history.push(`${this.props.match.url}/${userId}`);
  }

  render() {
    return (
      <UsersListTogglable
        usersContainer={UsersContainer}
        usersList={UsersList}
        sortByChoices={SORT_BY}
        baseUrl={this.props.match.url}
        onClickUser={this.onClickUser}
      />
    );
  }
}

UsersLayoutBase.propTypes = {
  history: PropTypes.any,
  match: PropTypes.any.isRequired
};

export const UsersLayout = withRouter(UsersLayoutBase);

export const UserLayoutBase = ({ match, history }) => {
  const cancel = () => {
    history.goBack();
  };
  return <User id={match.params.id} cancel={cancel} />;
};

UserLayoutBase.propTypes = {
  history: PropTypes.any,
  match: PropTypes.any.isRequired
};

export const UserLayout = withRouter(UserLayoutBase);
