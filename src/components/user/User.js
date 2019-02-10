import React, { Component } from "react";
import PropTypes from "prop-types";
import { debounce } from "lodash";

import { Form, Button, Divider, Message } from "semantic-ui-react";

import { Component as Container } from "src/components/container-content";
import { Component as UserAvatar } from "src/components/user-avatar";

import { Component as FieldValidationMessage } from "src/components/field-validation-message";

import "./user.css";

export class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitSuccess: false
    };

    this.handleRoleChange = this.handleRoleChange.bind(this);
    this.handlePasswordChange = debounce(this.handlePasswordChange.bind(this), 200);
    this.handleRepeatPasswordChange = debounce(this.handleRepeatPasswordChange.bind(this), 200);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
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
      password: data.value,
      submitSuccess: false
    }));
  }

  handleRepeatPasswordChange(event, data) {
    this.setState(state => ({
      ...state,
      repeatPassword: data.value,
      submitSuccess: false
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

  handleSubmit(event) {
    event.preventDefault();
    const { password, role } = this.state;
    this.props
      .submit(this.props.user._id, {
        password,
        role
      })
      .then(() => {
        this.setState(state => ({
          ...state,
          submitSuccess: true
        }));
      })
      .catch(() => {
        console.error("Error updating user");
      });
  }

  handleCancel() {
    event.preventDefault();
    this.props.cancel();
  }

  render() {
    const {
      user = {},
      userLoading,
      userError,
      roles,
      currentUserIsAdmin,
      submitLoading,
      submitError
    } = this.props;
    const { submitSuccess } = this.state;
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
      <Container loading={userLoading} error={userError}>
        <Container.Header as="h3">Modify User</Container.Header>
        <Container.Content>
          <Form
            loading={userLoading}
            onSubmit={this.handleSubmit}
            error={!!submitError}
            success={submitSuccess}
          >
            <UserAvatar user={user} loading={userLoading} />
            <Divider />
            <Message
              error
              header="Error modifying user"
              content={submitError && submitError.message}
            />
            <Message success header="Updated" content="User was successfully updated" />
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
            <div className="user--form--buttons-container" key={submitLoading}>
              <Button
                floated="right"
                color="blue"
                disabled={!submitEnabled || submitLoading}
                loading={submitLoading}
                type="submit"
              >
                Submit
              </Button>
              <Button
                floated="right"
                disabled={submitLoading}
                loading={submitLoading}
                onClick={this.handleCancel}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Container.Content>
      </Container>
    );
  }
}

User.propTypes = {
  cancel: PropTypes.func,
  currentUserIsAdmin: PropTypes.bool,
  roles: PropTypes.array,
  submit: PropTypes.func,
  submitError: PropTypes.instanceOf(Error),
  submitLoading: PropTypes.bool,
  user: PropTypes.any,
  userError: PropTypes.instanceOf(Error),
  userLoading: PropTypes.bool
};
