import React, { Component } from "react";
import { Menu, Image, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { RoutesContext } from "src/context/RoutesContext";

import "./homeMenu.css";

class HomeLogo extends Component {
  render() {
    return (
      <Link to={this.context.home}>
        <Image
          src={`${this.context.assets}/logo-white-trans.png`}
          className="home-menu__item--logo"
        />
      </Link>
    );
  }
}

HomeLogo.contextType = RoutesContext;

export const HomeMenu = () => (
  <React.Fragment>
    <Menu.Item className="home-menu__item">
      <HomeLogo />
    </Menu.Item>
    <Menu.Item className="home-menu__item home-menu__item--back">
      <Icon link name="arrow left" size="large" />
    </Menu.Item>
  </React.Fragment>
);
