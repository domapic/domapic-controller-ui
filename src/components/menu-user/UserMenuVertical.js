import React from "react";
import { Menu } from "semantic-ui-react";

import { UserAvatar } from "./UserAvatar";

export const UserMenuVertical = () => (
  <React.Fragment>
    <Menu.Item>
      <UserAvatar /> Javier Brea
    </Menu.Item>
    <Menu.Item>
      User
      <Menu.Menu>
        <Menu.Item>Account</Menu.Item>
        <Menu.Item>Logout</Menu.Item>
      </Menu.Menu>
    </Menu.Item>
  </React.Fragment>
);
