import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { plugins } from "reactive-data-source";
import { pickBy, identity } from "lodash";

import { UsersContainer } from "./views/UsersContainer";
import { UsersList } from "./views/UsersList";

import { Component as UsersListTogglable } from "src/components/users-list-togglable";
import { UpdateUser } from "./views/UpdateUser";
import { CreateUser } from "./views/CreateUser";
import { usersCollection, usersCollectionExactFiltered } from "src/data-sources/users";

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

export class CreateUserLayoutBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newUserId: false
    };
    this.createUser = this.createUser.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  createUser(userData) {
    return usersCollection.create(pickBy(userData, identity)).then(() => {
      return usersCollectionExactFiltered
        .filter({
          name: userData.name
        })
        .read()
        .then(results => {
          this.setState(state => ({
            ...state,
            newUserId: results[0]._id
          }));
        });
    });
  }

  onCancel() {
    this.props.history.goBack();
  }

  render() {
    const { newUserId } = this.state;

    return newUserId ? (
      <UpdateUser id={newUserId} onCancel={this.onCancel} fromCreation={true} />
    ) : (
      <CreateUser
        onCancel={this.onCancel}
        onSubmit={this.createUser}
        submitLoading={this.props.createLoading}
        submitError={this.props.createError}
        isNew={true}
        user={{}}
      />
    );
  }
}

CreateUserLayoutBase.propTypes = {
  createError: PropTypes.instanceOf(Error),
  createLoading: PropTypes.bool,
  history: PropTypes.any
};

export const mapDataSourceToProps = () => {
  return {
    createLoading: usersCollection.create.getters.loading,
    createError: usersCollection.create.getters.error
  };
};

export const CreateUserLayout = withRouter(
  plugins.connect(mapDataSourceToProps)(CreateUserLayoutBase)
);
