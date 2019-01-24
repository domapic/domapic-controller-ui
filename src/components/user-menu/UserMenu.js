import React from "react";
import PropTypes from "prop-types";
import { Dropdown, Button, Image, Icon } from "semantic-ui-react";

import "./userMenu.css";

const AvatarButton = () => (
  <Button circular className="user-button">
    <Image src="assets/logo.png" circular className="user-avatar" />
  </Button>
);

const Help = () => <Icon name="help circle" size="large" />;

export const UserMenu = () => (
  <React.Fragment>
    <Dropdown trigger={<Help />} pointing="top right" className="help-dropdown">
      <Dropdown.Menu>
        <Dropdown.Header>Text Size</Dropdown.Header>
        <Dropdown.Item>Small</Dropdown.Item>
        <Dropdown.Item>Medium</Dropdown.Item>
        <Dropdown.Item>Large</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    <Dropdown trigger={<AvatarButton />} pointing="top right" className="user-dropdown">
      <Dropdown.Menu>
        <Dropdown.Header>Text Size</Dropdown.Header>
        <Dropdown.Item>Small</Dropdown.Item>
        <Dropdown.Item>Medium</Dropdown.Item>
        <Dropdown.Item>Large</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </React.Fragment>
);
