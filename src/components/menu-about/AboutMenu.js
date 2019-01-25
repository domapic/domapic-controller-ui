import React from "react";
import { Dropdown, Icon } from "semantic-ui-react";

import "./aboutMenu.css";

const Help = () => <Icon name="help circle" size="large" />;

export const AboutMenu = () => (
  <Dropdown trigger={<Help />} pointing="top right" className="about-dropdown" icon={null}>
    <Dropdown.Menu>
      <Dropdown.Header>About</Dropdown.Header>
      <Dropdown.Divider />
      <Dropdown.Item>
        <Icon name="info circle" /> Controller
      </Dropdown.Item>
      <Dropdown.Item>
        <Icon name="power cord" /> Api Swagger
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);
