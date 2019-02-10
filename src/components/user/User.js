import React, { Component } from "react";
import PropTypes from "prop-types";
import debounce from "lodash.debounce";

import { Form, Button, Divider } from "semantic-ui-react";

import { Component as Container } from "src/components/container-content";
import { Component as UserAvatar } from "src/components/user-avatar";

import { Component as FieldValidationMessage } from "src/components/field-validation-message";

import "./user.css";

export class User extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleRoleChange = this.handleRoleChange.bind(this);
    this.handlePasswordChange = debounce(this.handlePasswordChange.bind(this), 200);
    this.handleRepeatPasswordChange = debounce(this.handleRepeatPasswordChange.bind(this), 200);
  }

  handleRoleChange(event, data) {
    const role = data.value !== this.props.user.role ? data.value : null;
    this.setState(state => ({
      ...state,
      role
    }));
  }

  handlePasswordChange(event, data) {
    this.setState(state => ({
      ...state,
      password: data.value
    }));
  }

  handleRepeatPasswordChange(event, data) {
    this.setState(state => ({
      ...state,
      repeatPassword: data.value
    }));
  }

  hasChangedPassword() {
    return this.state.password && this.state.password.length;
  }

  hasChangedRepeatPassword() {
    return this.state.repeatPassword && this.state.repeatPassword.length;
  }

  repeatedPasswordError() {
    if (this.hasChangedPassword() || this.hasChangedRepeatPassword()) {
      return this.state.password !== this.state.repeatPassword;
    }
    return false;
  }

  render() {
    const { user = {}, loading, error, roles, currentUserIsAdmin } = this.props;
    const repeatedPasswordError = this.repeatedPasswordError();
    const repeatedPasswordErrorMessage = repeatedPasswordError ? (
      <FieldValidationMessage message="Passwords are not the same" />
    ) : null;
    const submitEnabled = (this.hasChangedPassword() || this.state.role) && !repeatedPasswordError;

    const passwordFields = user.isSystemRole ? null : (
      <Form.Group>
        <Form.Input
          label="Password"
          width="5"
          type="password"
          onChange={this.handlePasswordChange}
        />
        <Form.Input
          label="Repeat password"
          width="5"
          type="password"
          onChange={this.handleRepeatPasswordChange}
        />
        {repeatedPasswordErrorMessage}
      </Form.Group>
    );
    const emailField = user.isSystemRole ? null : (
      <Form.Input label="Email" defaultValue={user.email} width="12" disabled />
    );

    return (
      <Container loading={loading} error={error}>
        <Container.Header as="h3">Modify User</Container.Header>
        <Container.Content>
          <Form loading={loading}>
            <UserAvatar user={user} loading={loading} />
            <Divider />
            <Form.Input label="Name" defaultValue={user.name} width="6" disabled />
            {emailField}
            <Form.Group>
              <Form.Dropdown
                selection
                options={roles.map(role => {
                  return {
                    key: role.name,
                    text: role.name,
                    value: role.name
                  };
                })}
                defaultValue={user.role}
                width="5"
                label="Role"
                disabled={user.isSystemRole || !currentUserIsAdmin}
                key={user._id}
                onChange={this.handleRoleChange}
              />
            </Form.Group>
            {passwordFields}
            <Divider />
            <div className="user--form--buttons-container">
              <Button floated="right" color="blue" disabled={!submitEnabled}>
                Submit
              </Button>
            </div>
          </Form>
        </Container.Content>
      </Container>
    );
  }
}

User.propTypes = {
  currentUserIsAdmin: PropTypes.bool,
  error: PropTypes.instanceOf(Error),
  loading: PropTypes.bool,
  roles: PropTypes.array,
  user: PropTypes.any
};
