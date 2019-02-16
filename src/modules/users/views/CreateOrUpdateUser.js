import React, { Component } from "react";
import PropTypes from "prop-types";
import { pickBy, identity } from "lodash";

import { UpdateUser } from "./UpdateUser";
import { CreateUser } from "./CreateUser";
import { usersCollection, userModels, usersCollectionExactFiltered } from "src/data-layer/users";

export class CreateOrUpdateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newId: false,
      deleting: false
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
    userModels
      .byId(this.userId())
      .delete()
      .then(() => {
        this.props.goBack();
      })
      .catch(() => {
        this.setState(state => ({
          ...state,
          deleting: false
        }));
      });
  }

  render() {
    const userId = this.state.newId || this.props.id;

    return userId ? (
      <UpdateUser
        id={userId}
        onCancel={this.props.goBack}
        fromCreation={!!this.state.newId}
        onDelete={this.onDelete}
        deleting={this.state.deleting}
      />
    ) : (
      <CreateUser onCancel={this.props.goBack} onSubmit={this.createUser} isNew={true} user={{}} />
    );
  }
}

CreateOrUpdateUser.propTypes = {
  goBack: PropTypes.func,
  id: PropTypes.string
};
