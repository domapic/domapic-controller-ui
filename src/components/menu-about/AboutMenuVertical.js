import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

import { RoutesContext } from "src/context/RoutesContext";

import "./aboutMenuVertical.css";

export class AboutMenuVertical extends Component {
  render() {
    return (
      <Menu.Item>
        About
        <Menu.Menu>
          <Menu.Item className="about-menu-vertical__item">
            <Link to={this.context.packageInfo}>Package info</Link>
          </Menu.Item>
          <Menu.Item className="about-menu-vertical__item">
            <Link to={this.context.swagger} target="_blank">
              Api Swagger
            </Link>
          </Menu.Item>
        </Menu.Menu>
      </Menu.Item>
    );
  }
}

AboutMenuVertical.contextType = RoutesContext;
