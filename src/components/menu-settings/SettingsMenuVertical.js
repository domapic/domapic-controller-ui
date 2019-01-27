import React from "react";
import { Menu } from "semantic-ui-react";

export const SettingsMenuVertical = () => (
  <Menu.Item>
    Settings
    <Menu.Menu>
      <Menu.Item>Configuration</Menu.Item>
      <Menu.Item>Users</Menu.Item>
    </Menu.Menu>
  </Menu.Item>
);
