import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import queryString from "query-string";

import { Grid, Header, Image } from "semantic-ui-react";

import { RoutesContext } from "src/contexts/RoutesContext";

import { Jwt } from "./Jwt";
import { ApiKey } from "./ApiKey";
import { types } from "./constants";

import "./login.css";

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
        <Jwt
          loading={this.props.jwtLoading}
          doLogin={this.doJwtLogin}
          error={this.props.jwtError}
          onChangeType={this.onChangeType}
          allowChangeType={this.props.allowChangeType}
        />
      ) : (
        <ApiKey
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
