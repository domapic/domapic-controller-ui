import React from "react";
import PropTypes from "prop-types";

import { Form, Button, Divider } from "semantic-ui-react";

import { Component as Container } from "src/components/container-content";
import { Component as UserAvatar } from "src/components/user-avatar";

import "./user.css";

export const User = ({ user = {}, loading, error, roles }) => {
  return (
    <Container loading={loading} error={error}>
      <Container.Header as="h3">
        <span>
          <UserAvatar user={user} loading={loading} />
          User
        </span>
      </Container.Header>
      <Container.Content>
        <Form loading={loading}>
          <Form.Input label="Name" defaultValue={user.name} width="6" />
          <Form.Input label="Email" defaultValue={user.email} width="12" />
          <Form.Dropdown
            selection
            options={roles.map(role => {
              return {
                key: role.name,
                text: role.name,
                value: role.name
              };
            })}
            value={user.role}
            width="4"
            label="Role"
          />
          <Form.Group>
            <Form.Input label="Password" width="5" type="password" />
            <Form.Input label="Repeat password" width="5" type="password" />
          </Form.Group>
          <Divider />
          <div className="user--form--buttons-container">
            <Button floated="right" color="blue">
              Submit
            </Button>
          </div>
        </Form>
      </Container.Content>
    </Container>
  );
};

User.propTypes = {
  error: PropTypes.instanceOf(Error),
  loading: PropTypes.bool,
  roles: PropTypes.array,
  user: PropTypes.any
};
