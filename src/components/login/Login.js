import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import queryString from "query-string";

import { Button, Form, Grid, Header, Image, Segment, Message } from "semantic-ui-react";

import { Component as ErrorComponent } from "src/components/error";
import { RoutesContext } from "src/contexts/RoutesContext";

import "./login.css";

const types = {
  JWT: "jwt",
  API_KEY: "api-key"
};

class JwtLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      password: ""
    };

    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.changeType = this.changeType.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUserChange(event) {
    this.setState(state => ({
      ...state,
      user: event.target.value
    }));
  }

  handlePasswordChange(event) {
    this.setState(state => ({
      ...state,
      password: event.target.value
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
            <Form.Input fluid icon="user" iconPosition="left" placeholder="User" />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
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

class ApiKeyLogin extends Component {
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

export class Login extends Component {
  constructor(props) {
    super(props);
    const queryStrings = queryString.parse(props.location.search) || {};
    this.state = {
      loggedIn: false,
      redirectTo: queryStrings.redirect,
      type: props.type || types.JWT
    };

    this.doJwtLogin = this.doJwtLogin.bind(this);
    this.doApiKeyLogin = this.doApiKeyLogin.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.setLoggedIn = this.setLoggedIn.bind(this);
  }

  setLoggedIn() {
    this.setState(state => ({
      ...state,
      loggedIn: true
    }));
  }

  doJwtLogin(userData) {
    event.preventDefault();
    this.props
      .doJwtLogin({
        user: userData.user,
        password: userData.password
      })
      .then(this.setLoggedIn);
  }

  doApiKeyLogin(apiKey) {
    this.props.doApiKeyLogin(apiKey).then(this.setLoggedIn);
  }

  onChangeType(type) {
    this.setState(state => ({
      ...state,
      type
    }));
  }

  render() {
    if (this.state.loggedIn) {
      return <Redirect to={this.state.redirectTo || this.context.home} />;
    }

    const loginComponent =
      this.state.type === types.JWT ? (
        <JwtLogin
          loading={this.props.jwtLoading}
          doLogin={this.doJwtLogin}
          error={this.props.jwtError}
          onChangeType={this.onChangeType}
          allowChangeType={this.props.allowChangeType}
        />
      ) : (
        <ApiKeyLogin
          doLogin={this.doApiKeyLogin}
          onChangeType={this.onChangeType}
          allowChangeType={this.props.allowChangeType}
        />
      );

    return (
      <div className="login-form">
        <Grid textAlign="center" className="login-form__grid" verticalAlign="middle">
          <Grid.Column className="login-form__column">
            <Header as="h2" color="grey" textAlign="center">
              <Image src={`${this.context.assets}/logo.png`} /> {this.props.header}
            </Header>
            {loginComponent}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

Login.contextType = RoutesContext;

Login.types = types;
