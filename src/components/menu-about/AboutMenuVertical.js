import React from "react";
import { Menu } from "semantic-ui-react";

export const AboutMenuVertical = () => (
  <Menu.Item>
    About
    <Menu.Menu>
      <Menu.Item>Package info</Menu.Item>
      <Menu.Item>Api Swagger</Menu.Item>
    </Menu.Menu>
  </Menu.Item>
);
