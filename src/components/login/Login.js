import React from "react";

import { Button, Form, Grid, Header, Image, Segment } from "semantic-ui-react";

import "./login.css";

export const Login = () => (
  <div className="login-form-container">
    <Grid textAlign="center" className="login-form" verticalAlign="middle">
      <Grid.Column className="login-column">
        <Header as="h2" color="grey" textAlign="center">
          <Image src="assets/logo.png" /> Domapic Controller
        </Header>
        <Form size="large">
          <Segment stacked>
            <Form.Input fluid icon="user" iconPosition="left" placeholder="E-mail address" />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
            />
            <Button color="blue" fluid size="large">
              Login
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  </div>
);
