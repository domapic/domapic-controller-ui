import React, { Component } from "react";
import { Dropdown, Button, Icon } from "semantic-ui-react";

import { UserAvatar } from "./UserAvatar";

import "./userMenuDropdown.css";

class AvatarButton extends Component {
  render() {
    return (
      <Button circular className="user-menu-dropdown__button">
        <UserAvatar />
      </Button>
    );
  }
}

export const UserMenuDropdown = () => (
  <Dropdown trigger={<AvatarButton />} pointing="top right" className="user-menu-dropdown">
    <Dropdown.Menu>
      <Dropdown.Header>User</Dropdown.Header>
      <Dropdown.Divider />
      <Dropdown.Item>
        <Icon name="user" /> Account
      </Dropdown.Item>
      <Dropdown.Item>
        <Icon name="shutdown" /> Logout
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);
