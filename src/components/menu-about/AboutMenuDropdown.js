import React from "react";
import { Dropdown, Icon } from "semantic-ui-react";

import "./aboutMenuDropdown.css";

const Help = () => <Icon name="help circle" size="large" />;

export const AboutMenuDropdown = () => (
  <Dropdown trigger={<Help />} pointing="top right" className="about-menu-dropdown" icon={null}>
    <Dropdown.Menu>
      <Dropdown.Header>About</Dropdown.Header>
      <Dropdown.Divider />
      <Dropdown.Item>
        <Icon name="info circle" /> Package info
      </Dropdown.Item>
      <Dropdown.Item>
        <Icon name="power cord" /> Api Swagger
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);
