import React, { Component } from "react";
import { Dropdown, Button, Icon } from "semantic-ui-react";

import { RoutesContext } from "src/context/RoutesContext";

import { Component as UserAvatar } from "src/components/user-avatar";

import "./userMenu.css";

class AvatarButton extends Component {
  render() {
    return (
      <Button circular className="user-button">
        <UserAvatar />
      </Button>
    );
  }
}

AvatarButton.contextType = RoutesContext;

export const UserMenu = () => (
  <Dropdown trigger={<AvatarButton />} pointing="top right" className="user-dropdown">
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
