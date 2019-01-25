import React, { Component } from "react";
import { Dropdown, Button, Image, Icon } from "semantic-ui-react";

import { ConfigContext } from "src/context/ConfigContext";

import "./userMenu.css";

class AvatarButton extends Component {
  render() {
    return (
      <Button circular className="user-button">
        <Image
          src={`${this.context.staticsRoute}assets/logo.png`}
          circular
          className="user-avatar"
        />
      </Button>
    );
  }
}

AvatarButton.contextType = ConfigContext;

export const UserMenu = () => (
  <Dropdown trigger={<AvatarButton />} pointing="top right" className="user-dropdown">
    <Dropdown.Menu>
      <Dropdown.Header>User</Dropdown.Header>
      <Dropdown.Divider />
      <Dropdown.Item>
        <Icon name="configure" /> Account
      </Dropdown.Item>
      <Dropdown.Item>
        <Icon name="shutdown" /> Logout
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);
