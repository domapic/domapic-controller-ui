import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { Button, Form, Grid, Header, Image, Segment } from "semantic-ui-react";

import { Component as ErrorComponent } from "src/components/error";
import { RoutesContext } from "src/contexts/RoutesContext";

import "./login.css";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      password: "",
      loggedIn: false
    };

    this.handleUserChange = this.handleUserChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

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
    this.props
      .doLoginAndAuth({
        user: this.state.user,
        password: this.state.password
      })
      .then(() => {
        this.setState(state => ({
          ...state,
          loggedIn: true
        }));
      });
  }

  render() {
    const error = this.props.error ? <ErrorComponent message={this.props.error.message} /> : null;
    if (this.state.loggedIn) {
      return <Redirect to={this.context.home} />;
    }

    return (
      <div className="login-form-container">
        <Grid textAlign="center" className="login-form" verticalAlign="middle">
          <Grid.Column className="login-column">
            <Header as="h2" color="grey" textAlign="center">
              <Image src={`${this.context.assets}/logo.png`} /> Domapic Controller
            </Header>
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
            {error}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

Login.contextType = RoutesContext;
