import React, { Component } from "react";
import PropTypes from "prop-types";

import { UsersContainer } from "./views/UsersContainer";
import { UsersList } from "./views/UsersList";

import { Component as UsersListTogglable } from "src/components/users-list-togglable";
//import { User } from "./views/User";

const SORT_BY = ["name", "email", "role"];

export class UsersLayout extends Component {
  render() {
    return (
      <UsersListTogglable
        usersContainer={UsersContainer}
        usersList={UsersList}
        sortByChoices={SORT_BY}
        baseUrl={this.props.match.url}
      />
    );
  }
}

UsersLayout.propTypes = {
  match: PropTypes.any.isRequired
};

/* export const UserLayout = ({ match }) => <User id={match.params.id} />;

UserLayout.propTypes = {
  match: PropTypes.any.isRequired
}; */
