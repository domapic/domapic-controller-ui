import React, { Component } from "react";
import PropTypes from "prop-types";
import { Icon, Menu as SemanticMenu } from "semantic-ui-react";

import { Component as Responsive } from "src/components/responsive";

import "./headerMenu.css";

export class HeaderMenu extends Component {
  render() {
    const Menu = this.props.Menu;
    return (
      <SemanticMenu inverted size="small" fixed="top" className="sidebar-layout__header-menu">
        <Responsive device="desktop" className="sidebar-layout__header-menu__container">
          <Menu.Home />
          <Menu.Sections sections={this.props.sections} />
          <SemanticMenu.Item position="right" className="sidebar-layout__header-menu__item--right">
            <Menu.Settings />
            <Menu.About />
            <Menu.User />
          </SemanticMenu.Item>
        </Responsive>
        <Responsive device="mobile" className="sidebar-layout__header-menu__container">
          <SemanticMenu.Item
            onClick={this.props.handleToggle}
            className="sidebar-layout__header-menu__item--toggle"
          >
            <Icon name="sidebar" />
          </SemanticMenu.Item>
          <Menu.Home />
          <SemanticMenu.Item position="right" className="sidebar-layout__header-menu__item--right">
            <Menu.User />
          </SemanticMenu.Item>
        </Responsive>
      </SemanticMenu>
    );
  }
}

HeaderMenu.propTypes = {
  Menu: PropTypes.func,
  handleToggle: PropTypes.func,
  sections: PropTypes.array
};
