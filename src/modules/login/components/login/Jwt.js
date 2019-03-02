import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Form, Segment, Message } from "semantic-ui-react";
import { debounce } from "lodash";

import { Component as ErrorComponent } from "src/components/error";

import { types } from "./constants";

const USER_FIELD = "user";
const PASSWORD_FIELD = "password";

export class Jwt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      [USER_FIELD]: "",
      [PASSWORD_FIELD]: "",
      disabled: true
    };

    this.handleUserChange = debounce(this.handleUserChange.bind(this), 200);
    this.handlePasswordChange = debounce(this.handlePasswordChange.bind(this), 200);
    this.changeType = this.changeType.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateState(field, value) {
    const stateFieldToCheck = field === USER_FIELD ? PASSWORD_FIELD : USER_FIELD;
    this.setState(state => ({
      ...state,
      [field]: value,
      disabled: !(value.length > 0 && state[stateFieldToCheck].length > 0)
    }));
  }

  handleUserChange(event, data) {
    this.updateState(USER_FIELD, data.value);
  }

  handlePasswordChange(event, data) {
    this.updateState(PASSWORD_FIELD, data.value);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.doLogin(this.state);
  }

  changeType() {
    this.props.onChangeType(types.API_KEY);
  }

  render() {
    const error = this.props.error ? (
      <ErrorComponent>{this.props.error.message}</ErrorComponent>
    ) : null;
    const changeType = this.props.allowChangeType ? (
      <Message attached="bottom" className="login-form__message">
        <a onClick={this.changeType}>Login using API-Key</a>
      </Message>
    ) : null;
    return (
      <React.Fragment>
        <Form size="large" onSubmit={this.handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="User"
              onChange={this.handleUserChange}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              onChange={this.handlePasswordChange}
            />
            <Button
              color="blue"
              fluid
              size="large"
              loading={this.props.loading}
              disabled={this.state.disabled || this.props.loading}
              className="login-form__button"
            >
              Login
            </Button>
          </Segment>
        </Form>
        {changeType}
        {error}
      </React.Fragment>
    );
  }
}

Jwt.propTypes = {
  allowChangeType: PropTypes.bool,
  doLogin: PropTypes.func,
  error: PropTypes.instanceOf(Error),
  loading: PropTypes.bool,
  onChangeType: PropTypes.func
};
