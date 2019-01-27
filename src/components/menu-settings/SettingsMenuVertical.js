import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

import { RoutesContext } from "src/context/RoutesContext";

import "./settingsMenuVertical.css";

export class SettingsMenuVertical extends Component {
  render() {
    return (
      <Menu.Item>
        Settings
        <Menu.Menu>
          <Menu.Item className="settings-menu-vertical__item">
            <Link to={this.context.configuration}>Configuration</Link>
          </Menu.Item>
          <Menu.Item className="settings-menu-vertical__item">
            <Link to={this.context.users}>Users</Link>
          </Menu.Item>
        </Menu.Menu>
      </Menu.Item>
    );
  }
}

SettingsMenuVertical.contextType = RoutesContext;
