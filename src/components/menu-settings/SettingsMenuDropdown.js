import React from "react";
import { Dropdown, Icon } from "semantic-ui-react";

import "./settingsMenuDropdown.css";

const Settings = () => <Icon name="configure" size="large" />;

export const SettingsMenuDropdown = () => (
  <Dropdown
    trigger={<Settings />}
    pointing="top right"
    className="settings-menu-dropdown"
    icon={null}
  >
    <Dropdown.Menu>
      <Dropdown.Header>Settings</Dropdown.Header>
      <Dropdown.Divider />
      <Dropdown.Item>
        <Icon name="configure" /> Configuration
      </Dropdown.Item>
      <Dropdown.Item>
        <Icon name="users" /> Users
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);
