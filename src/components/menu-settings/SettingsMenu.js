import React from "react";
import { Dropdown, Icon } from "semantic-ui-react";

import "./settingsMenu.css";

const Settings = () => <Icon name="configure" size="large" />;

export const SettingsMenu = () => (
  <Dropdown trigger={<Settings />} pointing="top right" className="settings-dropdown" icon={null}>
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
