import React, { Component } from "react";

import { Button, Form, Segment, Message } from "semantic-ui-react";

import { types } from "./constants";

export class ApiKey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiKey: ""
    };

    this.handleApiKeyChange = this.handleApiKeyChange.bind(this);
    this.changeType = this.changeType.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleApiKeyChange(event) {
    this.setState(state => ({
      ...state,
      apiKey: event.target.value
    }));
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.doLogin(this.state.apiKey);
  }

  changeType() {
    this.props.onChangeType(types.JWT);
  }

  render() {
    const changeType = this.props.allowChangeType ? (
      <Message attached="bottom" className="login-form__message">
        <a onClick={this.changeType}>Login using user and password</a>
      </Message>
    ) : null;
    return (
      <React.Fragment>
        <Form size="large" onSubmit={this.handleSubmit}>
          <Segment stacked>
            <Form.Input fluid icon="key" iconPosition="left" placeholder="Api key" />
            <Button color="blue" fluid size="large">
              Login
            </Button>
          </Segment>
        </Form>
        {changeType}
      </React.Fragment>
    );
  }
}
