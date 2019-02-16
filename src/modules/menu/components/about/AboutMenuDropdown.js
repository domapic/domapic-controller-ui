import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Icon } from "semantic-ui-react";

import { RoutesContext } from "src/contexts/RoutesContext";

import "./aboutMenuDropdown.css";

const Help = () => <Icon name="help circle" size="large" className="about-menu-dropdown__icon" />;

export class AboutMenuDropdown extends Component {
  render() {
    return (
      <Dropdown
        trigger={<Help />}
        pointing="top right"
        className="about-menu-dropdown"
        icon={null}
      >
        <Dropdown.Menu>
          <Dropdown.Header>About</Dropdown.Header>
          <Dropdown.Divider />
          <Dropdown.Item>
            <Link to={this.context.about}>
              <Icon name="info circle" /> Package info
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link to={this.context.swagger} target="_blank">
              <Icon name="power cord" /> Api Swagger
            </Link>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

AboutMenuDropdown.contextType = RoutesContext;
