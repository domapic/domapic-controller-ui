import React, { Component } from "react";
import PropTypes from "prop-types";
import { pickBy, identity } from "lodash";

import { UpdateUser } from "./UpdateUser";
import { CreateUser } from "./CreateUser";
import {
  usersCollection,
  usersModels,
  usersCollectionExactFiltered
} from "src/data-sources/users";

export class CreateOrUpdateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newId: false,
      deleting: false,
      deleted: false
    };
    this.createUser = this.createUser.bind(this);
    this.onDelete = this.onDelete.bind(this);
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
            newId: results[0]._id
          }));
        });
    });
  }

  userId() {
    return this.state.newId || this.props.id;
  }

  onDelete() {
    this.setState(state => ({
      ...state,
      deleting: true
    }));
    usersModels
      .byId(this.userId())
      .delete()
      .then(() => {
        this.setState(state => ({
          ...state,
          deleting: false,
          deleted: true
        }));
        this.props.goBack();
      })
      .catch(() => {
        this.setState(state => ({
          ...state,
          deleting: false,
          deleted: false
        }));
      });
  }

  render() {
    const userId = this.state.newId || this.props.id;

    if (this.state.deleting || this.state.deleted) {
      return null;
    }

    return userId ? (
      <UpdateUser
        id={userId}
        onCancel={this.props.goBack}
        fromCreation={!!this.state.newId}
        onDelete={this.onDelete}
      />
    ) : (
      <CreateUser
        onCancel={this.props.goBack}
        onSubmit={this.createUser}
        submitLoading={this.props.createLoading}
        submitError={this.props.createError}
        isNew={true}
        user={{}}
      />
    );
  }
}

CreateOrUpdateUser.propTypes = {
  createError: PropTypes.instanceOf(Error),
  createLoading: PropTypes.bool,
  goBack: PropTypes.func,
  id: PropTypes.string
};
