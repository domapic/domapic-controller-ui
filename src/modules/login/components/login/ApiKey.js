import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Form, Segment, Message } from "semantic-ui-react";
import debounce from "lodash.debounce";

import { types } from "./constants";

export class ApiKey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiKey: "",
      disabled: true
    };

    this.handleApiKeyChange = debounce(this.handleApiKeyChange.bind(this), 200);
    this.changeType = this.changeType.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleApiKeyChange(event, data) {
    this.setState(state => ({
      ...state,
      apiKey: data.value,
      disabled: !(data.value.length > 0)
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
            <Form.Input
              fluid
              icon="key"
              iconPosition="left"
              placeholder="Api key"
              onChange={this.handleApiKeyChange}
            />
            <Button
              color="blue"
              fluid
              size="large"
              disabled={this.state.disabled}
              className="login-form__button"
            >
              Login
            </Button>
          </Segment>
        </Form>
        {changeType}
      </React.Fragment>
    );
  }
}

ApiKey.propTypes = {
  allowChangeType: PropTypes.bool,
  doLogin: PropTypes.func,
  onChangeType: PropTypes.func
};
