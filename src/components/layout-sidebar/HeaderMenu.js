import React, { Component } from "react";
import PropTypes from "prop-types";
import { Icon, Menu } from "semantic-ui-react";

import { Component as AboutMenu } from "src/components/menu-about";
import { Component as Responsive } from "src/components/responsive";

import "./headerMenu.css";

export class HeaderMenu extends Component {
  render() {
    const UserMenu = this.props.userMenu;
    const SettingsMenu = this.props.settingsMenu;
    const HomeMenu = this.props.homeMenu;
    return (
      <Menu inverted size="small" fixed="top" className="sidebar-layout__header-menu">
        <Responsive device="desktop" className="sidebar-layout__header-menu__container">
          <HomeMenu />
          {this.props.menu}
          <Menu.Item position="right" className="sidebar-layout__header-menu__item--right">
            <SettingsMenu />
            <AboutMenu />
            <UserMenu />
          </Menu.Item>
        </Responsive>
        <Responsive device="mobile" className="sidebar-layout__header-menu__container">
          <Menu.Item
            onClick={this.props.handleToggle}
            className="sidebar-layout__header-menu__item--toggle"
          >
            <Icon name="sidebar" />
          </Menu.Item>
          <HomeMenu />
          <Menu.Item position="right" className="sidebar-layout__header-menu__item--right">
            <UserMenu />
          </Menu.Item>
        </Responsive>
      </Menu>
    );
  }
}

HeaderMenu.propTypes = {
  handleToggle: PropTypes.func,
  homeMenu: PropTypes.func,
  menu: PropTypes.node,
  settingsMenu: PropTypes.func,
  userMenu: PropTypes.func
};
