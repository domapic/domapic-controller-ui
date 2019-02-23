import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Icon } from "semantic-ui-react";

import { RoutesContext } from "src/contexts/RoutesContext";

import "./settingsMenuDropdown.css";

const Settings = () => (
  <Icon name="configure" size="large" className="settings-menu-dropdown__icon" />
);

export class SettingsMenuDropdown extends Component {
  render() {
    return (
      <Dropdown
        trigger={<Settings />}
        pointing="top right"
        className="settings-menu-dropdown"
        icon={null}
      >
        <Dropdown.Menu>
          <Dropdown.Header>Settings</Dropdown.Header>
          <Dropdown.Divider />
          <Dropdown.Item as={Link} to={this.context.configuration}>
            <Icon name="configure" /> Configuration
          </Dropdown.Item>
          <Dropdown.Item as={Link} to={this.context.users}>
            <Icon name="users" /> Users
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

SettingsMenuDropdown.contextType = RoutesContext;
