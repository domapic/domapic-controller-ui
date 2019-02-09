import React from "react";
import PropTypes from "prop-types";

import { Table } from "semantic-ui-react";

import { Component as UserAvatar } from "src/components/user-avatar";

import "./usersList.css";

export const User = ({ baseUrl, user }) => {
  const onClick = event => {
    event.preventDefault();
    console.log("clicked");
    console.log(baseUrl);
    console.log(user._id);
  };
  return (
    <Table.Row
      onClick={onClick}
      selectable={false}
      className={user.isSystemRole ? "users-list__row--system" : ""}
    >
      <Table.Cell textAlign="center">
        <UserAvatar user={user} />
      </Table.Cell>
      <Table.Cell>{user.name}</Table.Cell>
      <Table.Cell>{user.email}</Table.Cell>
      <Table.Cell>{user.role}</Table.Cell>
    </Table.Row>
  );
};

User.propTypes = {
  baseUrl: PropTypes.string,
  user: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string
  })
};

export const UsersList = ({ users, baseUrl }) => (
  <Table unstackable compact="very" selectable size="large" definition className="users-list">
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell />
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Email</Table.HeaderCell>
        <Table.HeaderCell>Role</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {users.map(user => (
        <User key={user._id} user={user} baseUrl={baseUrl} />
      ))}
    </Table.Body>
  </Table>
);

UsersList.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  users: PropTypes.array
};
