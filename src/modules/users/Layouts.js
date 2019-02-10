import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { UsersContainer } from "./views/UsersContainer";
import { UsersList } from "./views/UsersList";

import { Component as UsersListTogglable } from "src/components/users-list-togglable";
import { UpdateUser } from "./views/UpdateUser";
import { CreateUser } from "./views/CreateUser";

// LIST USERS

const SORT_BY = ["name", "email", "role"];

export class UsersLayoutBase extends Component {
  constructor() {
    super();
    this.onClickUser = this.onClickUser.bind(this);
    this.onClickNew = this.onClickNew.bind(this);
  }

  onClickUser(userId) {
    this.props.history.push(`${this.props.match.url}/${userId}`);
  }

  onClickNew() {
    this.props.history.push(`${this.props.match.url}/create`);
  }

  render() {
    return (
      <UsersListTogglable
        usersContainer={UsersContainer}
        usersList={UsersList}
        sortByChoices={SORT_BY}
        baseUrl={this.props.match.url}
        onClickUser={this.onClickUser}
        onClickNew={this.onClickNew}
      />
    );
  }
}

UsersLayoutBase.propTypes = {
  history: PropTypes.any,
  match: PropTypes.any.isRequired
};

export const UsersLayout = withRouter(UsersLayoutBase);

// UPDATE USER

export const UpdateUserLayoutBase = ({ match, history }) => {
  const onCancel = () => {
    history.goBack();
  };
  return <UpdateUser id={match.params.id} onCancel={onCancel} />;
};

UpdateUserLayoutBase.propTypes = {
  history: PropTypes.any,
  match: PropTypes.any.isRequired
};

export const UpdateUserLayout = withRouter(UpdateUserLayoutBase);

// CREATE USER

export const CreateUserLayoutBase = ({ history }) => {
  const onCancel = () => {
    history.goBack();
  };
  return <CreateUser onCancel={onCancel} />;
};

CreateUserLayoutBase.propTypes = {
  history: PropTypes.any
};

export const CreateUserLayout = withRouter(CreateUserLayoutBase);
