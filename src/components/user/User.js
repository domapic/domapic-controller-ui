import React, { Component } from "react";
import PropTypes from "prop-types";
import { debounce } from "lodash";

import { Form, Button, Divider, Message, Confirm, Header, Icon } from "semantic-ui-react";

import { Component as Container } from "src/components/container-content";
import { Component as UserAvatar } from "src/components/user-avatar";
import { Component as Breadcrumbs } from "src/components/breadcrumbs";

import { Component as FieldValidationMessage } from "src/components/field-validation-message";

import "./user.css";

const NAME_NOT_VALID = "User name is not valid";
const EMAIL_NOT_VALID = "Email is not valid";

export class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitSuccess: props.fromCreation,
      submitted: false,
      fromCreation: props.fromCreation,
      deleteConfirmOpen: false
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleNameBlur = this.handleNameBlur.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleEmailBlur = this.handleEmailBlur.bind(this);
    this.handleRoleChange = this.handleRoleChange.bind(this);
    this.handlePasswordChange = debounce(this.handlePasswordChange.bind(this), 200);
    this.handleRepeatPasswordChange = debounce(this.handleRepeatPasswordChange.bind(this), 200);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDeleteCancel = this.handleDeleteCancel.bind(this);
    this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this);
  }

  handleNameChange(event, data) {
    const name = data.value !== this.props.user.name ? data.value : null;
    this.setState(state => ({
      ...state,
      name,
      submitSuccess: false,
      nameValid: this.props.isValidUserName(name),
      nameError: null
    }));
  }

  handleEmailChange(event, data) {
    const email = data.value !== this.props.user.email ? data.value : null;
    this.setState(state => ({
      ...state,
      email,
      submitSuccess: false,
      emailValid: this.props.isValidUserEmail(email),
      emailError: null
    }));
  }

  handleRoleChange(event, data) {
    const role = data.value !== this.props.user.role ? data.value : null;
    this.setState(state => ({
      ...state,
      role,
      submitSuccess: false,
      roleValid: !!role
    }));
  }

  handlePasswordChange(event, data) {
    const password = data.value;
    this.setState(state => ({
      ...state,
      password,
      submitSuccess: false,
      passwordsValid: password.length && state.repeatPassword === password
    }));
  }

  handleRepeatPasswordChange(event, data) {
    const repeatPassword = data.value;
    this.setState(state => ({
      ...state,
      repeatPassword,
      submitSuccess: false,
      passwordsValid: repeatPassword.length && state.password === repeatPassword
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

  hasChangedName() {
    return this.state.name && this.state.name.length;
  }

  hasValidName() {
    return this.props.isValidUserName(this.state.name);
  }

  hasChangedEmail() {
    return this.state.email && this.state.email.length;
  }

  hasValidEmail() {
    return this.props.isValidUserEmail(this.state.email);
  }

  hasChangedRole() {
    return this.state.role && this.state.role.length;
  }

  hasValidRole() {
    return this.state.role && this.state.role.length;
  }

  hasValidPassword() {
    return this.state.email && this.state.email.length;
  }

  submitEnabled() {
    if (!this.props.isNew) {
      return (this.hasChangedPassword() || this.state.role) && !this.repeatedPasswordError();
    }
    return (
      this.hasChangedName() &&
      this.hasValidName() &&
      !this.state.nameError &&
      this.hasChangedEmail() &&
      this.hasValidEmail() &&
      !this.state.emailError &&
      this.hasChangedRole() &&
      this.hasValidRole() &&
      this.hasChangedPassword() &&
      this.hasValidPassword() &&
      !this.repeatedPasswordError()
    );
  }

  handleNameBlur() {
    if (this.hasChangedName()) {
      if (!this.hasValidName()) {
        this.setState(state => ({
          ...state,
          nameError: NAME_NOT_VALID
        }));
      } else {
        this.props.isUserNameRepeated(this.state.name).then(isRepeated => {
          this.setState(state => ({
            ...state,
            nameValid: !isRepeated,
            nameError: isRepeated ? "Name is repeated" : null
          }));
        });
      }
    } else {
      this.setState(state => ({
        ...state,
        nameError: null
      }));
    }
  }

  handleEmailBlur() {
    if (this.hasChangedEmail()) {
      if (!this.hasValidEmail()) {
        this.setState(state => ({
          ...state,
          emailError: EMAIL_NOT_VALID
        }));
      } else {
        this.props.isUserEmailRepeated(this.state.email).then(isRepeated => {
          this.setState(state => ({
            ...state,
            emailValid: !isRepeated,
            emailError: isRepeated ? "Email is repeated" : null
          }));
        });
      }
    } else {
      this.setState(state => ({
        ...state,
        emailError: null
      }));
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name, email, password, role } = this.state;
    this.setState(state => ({
      ...state,
      submitSuccess: false,
      submitted: true
    }));

    this.props
      .onSubmit({
        name,
        email,
        password,
        role
      })
      .then(() => {
        if (!this.props.isNew) {
          this.setState(state => ({
            ...state,
            name: null,
            nameValid: false,
            email: null,
            emailValid: false,
            role: null,
            roleValid: null,
            passwordsValid: null,
            submitSuccess: true,
            fromCreation: false
          }));
        }
      })
      .catch(() => {
        console.error("Error sending user");
      });
  }

  handleCancel() {
    event.preventDefault();
    this.props.onCancel();
  }

  handleDelete() {
    event.preventDefault();
    this.setState(state => ({
      ...state,
      deleteConfirmOpen: true
    }));
  }

  handleDeleteCancel() {
    this.setState(state => ({
      ...state,
      deleteConfirmOpen: false
    }));
  }

  handleDeleteConfirm() {
    event.preventDefault();
    this.setState(state => ({
      ...state,
      submitted: true,
      deleteConfirmOpen: false
    }));
    this.props.onDelete();
  }

  render() {
    const {
      user = {},
      userLoading,
      userError,
      roles,
      currentUserIsAdmin,
      submitLoading,
      submitError,
      isNew,
      userDeleteError,
      userDeleteLoading,
      breadcrumbs
    } = this.props;
    const {
      submitted,
      submitSuccess,
      nameError,
      nameValid,
      emailError,
      emailValid,
      roleValid,
      passwordsValid,
      fromCreation,
      deleteConfirmOpen
    } = this.state;

    console.log("breadcrumbS");
    console.log(breadcrumbs);

    const repeatedPasswordErrorMessage = passwordsValid ? (
      <FieldValidationMessage valid />
    ) : this.repeatedPasswordError() ? (
      <FieldValidationMessage message="Passwords are not equal" />
    ) : null;

    const nameMessage = nameValid ? (
      <FieldValidationMessage valid />
    ) : nameError ? (
      <FieldValidationMessage message={nameError || ""} />
    ) : null;

    const emailMessage = emailValid ? (
      <FieldValidationMessage valid />
    ) : emailError ? (
      <FieldValidationMessage message={emailError || ""} />
    ) : null;

    const roleMessage = roleValid ? <FieldValidationMessage valid /> : null;

    const submitEnabled = this.submitEnabled();

    const deleteButton =
      user._id && currentUserIsAdmin ? (
        <Button
          color="red"
          loading={userDeleteLoading}
          disabled={submitLoading || userDeleteLoading}
          onClick={this.handleDelete}
          size="tiny"
        >
          Delete
        </Button>
      ) : null;

    const nameField = (
      <Form.Group>
        <Form.Input
          label="Name"
          defaultValue={user.name}
          width="6"
          disabled={!isNew}
          onChange={this.handleNameChange}
          onBlur={this.handleNameBlur}
        />
        {nameMessage}
      </Form.Group>
    );

    const emailField = user.isSystemRole ? null : (
      <Form.Group>
        <Form.Input
          label="Email"
          defaultValue={user.email}
          width="12"
          disabled={!isNew}
          onChange={this.handleEmailChange}
          onBlur={this.handleEmailBlur}
        />
        {emailMessage}
      </Form.Group>
    );

    const roleField = (
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
        {roleMessage}
      </Form.Group>
    );

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
    return (
      <Container loading={userLoading || userDeleteLoading} error={userError} background={true}>
        <Container.Header>
          <Breadcrumbs
            sections={breadcrumbs.concat({ text: `${isNew ? "Create" : "Modify"} User` })}
          />
        </Container.Header>
        <Container.Content>
          <Form
            loading={userLoading}
            onSubmit={this.handleSubmit}
            error={submitted && (!!submitError || !!userDeleteError)}
            success={submitSuccess}
          >
            <UserAvatar user={user} loading={userLoading} />
            <Divider />
            <Message
              error
              header={`Error ${
                submitError ? (isNew ? "creating" : "modifying") : "deleting"
              } user`}
              content={
                submitError ? submitError.message : userDeleteError ? userDeleteError.message : ""
              }
            />
            <Message
              success
              header={fromCreation ? "Created" : "Modified"}
              content={`User was successfully ${fromCreation ? "created" : "modified"}`}
            />
            {nameField}
            {emailField}
            {roleField}
            {passwordFields}
            <Divider />
            <div className="user--form--buttons-container" key={submitLoading}>
              {deleteButton}
              <Button
                floated="right"
                color="green"
                disabled={!submitEnabled || submitLoading || userDeleteLoading}
                loading={submitLoading}
              >
                Submit
              </Button>
              <Button
                floated="right"
                disabled={submitLoading || userDeleteLoading}
                onClick={this.handleCancel}
              >
                Cancel
              </Button>
              <Confirm
                open={deleteConfirmOpen}
                header={
                  <Header as="h2">
                    <Icon name="warning" color="red" />
                    <Header.Content>Danger zone</Header.Content>
                  </Header>
                }
                content={`You are going to delete the "${user.name}" user. Are you sure?`}
                onCancel={this.handleDeleteCancel}
                onConfirm={this.handleDeleteConfirm}
              />
            </div>
          </Form>
        </Container.Content>
      </Container>
    );
  }
}

User.propTypes = {
  breadcrumbs: PropTypes.array,
  currentUserIsAdmin: PropTypes.bool,
  fromCreation: PropTypes.bool,
  isNew: PropTypes.bool,
  isUserEmailRepeated: PropTypes.func,
  isUserNameRepeated: PropTypes.func,
  isValidUserEmail: PropTypes.func,
  isValidUserName: PropTypes.func,
  onCancel: PropTypes.func,
  onDelete: PropTypes.func,
  onSubmit: PropTypes.func,
  roles: PropTypes.array,
  submitError: PropTypes.instanceOf(Error),
  submitLoading: PropTypes.bool,
  user: PropTypes.any,
  userDeleteError: PropTypes.instanceOf(Error),
  userDeleteLoading: PropTypes.bool,
  userError: PropTypes.instanceOf(Error),
  userLoading: PropTypes.bool
};
