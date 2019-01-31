import React, { Component } from "react";
import { Button, Form, Segment, Message } from "semantic-ui-react";
import debounce from "lodash.debounce";

import { Component as ErrorComponent } from "src/components/error";

import { types } from "./constants";

export class Jwt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      password: ""
    };

    this.handleUserChange = debounce(this.handleUserChange.bind(this), 200);
    this.handlePasswordChange = debounce(this.handlePasswordChange.bind(this), 200);
    this.changeType = this.changeType.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUserChange(event, data) {
    this.setState(state => ({
      ...state,
      user: data.value
    }));
  }

  handlePasswordChange(event, data) {
    this.setState(state => ({
      ...state,
      password: data.value
    }));
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.doLogin(this.state);
  }

  changeType() {
    this.props.onChangeType(types.API_KEY);
  }

  render() {
    const error = this.props.error ? <ErrorComponent message={this.props.error.message} /> : null;
    const changeType = this.props.allowChangeType ? (
      <Message attached="bottom" className="login-form__message">
        <a onClick={this.changeType}>Login using API-Key</a>
      </Message>
    ) : null;
    return (
      <React.Fragment>
        <Form size="large" onSubmit={this.handleSubmit}>
          <Segment stacked>
            <Form.Input fluid icon="user" iconPosition="left" placeholder="User" onChange={this.handleUserChange}/>
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              onChange={this.handlePasswordChange}
            />
            <Button color="blue" fluid size="large" loading={this.props.loading}>
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
