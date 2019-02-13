import React from "react";
import PropTypes from "prop-types";

import { Table } from "semantic-ui-react";

import "./usersList.css";

export const User = ({ user, onClickUser, UserAvatar }) => {
  const onClick = event => {
    event.preventDefault();
    onClickUser(user._id);
  };
  return (
    <Table.Row onClick={onClick} className={user.isSystemRole ? "users-list__row--system" : ""}>
      <Table.Cell textAlign="center">
        <UserAvatar email={user.email} />
      </Table.Cell>
      <Table.Cell>{user.name}</Table.Cell>
      <Table.Cell>{user.email}</Table.Cell>
      <Table.Cell>{user.role}</Table.Cell>
    </Table.Row>
  );
};

User.propTypes = {
  UserAvatar: PropTypes.func,
  onClickUser: PropTypes.func,
  user: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string
  })
};

export const UsersList = ({ users, onClickUser, UserAvatar }) => (
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
        <User key={user._id} user={user} onClickUser={onClickUser} UserAvatar={UserAvatar} />
      ))}
    </Table.Body>
  </Table>
);

UsersList.propTypes = {
  UserAvatar: PropTypes.func,
  onClickUser: PropTypes.func,
  users: PropTypes.array
};
