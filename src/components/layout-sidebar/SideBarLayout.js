import React, { Component } from "react";
import PropTypes from "prop-types";
import { Menu, Responsive, Sidebar } from "semantic-ui-react";

import { Component as MainContainer } from "src/components/container-main";
import { Component as AboutMenu } from "src/components/menu-about";
import { windowInnerWidth } from "src/helpers/responsive";

import { HeaderMenu } from "./HeaderMenu";

import "./sideBarLayout.css";

export class SideBarLayout extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleSidebarHide = this.handleSidebarHide.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleSidebarHide() {
    this.setState({ sidebarOpened: false });
  }

  handleToggle() {
    this.setState({ sidebarOpened: true });
  }

  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;
    const UserMenu = this.props.userMenu;
    const SettingsMenu = this.props.settingsMenu;

    const menu = <HeaderMenu {...this.props} handleToggle={this.handleToggle} />;

    const rootMenu = sidebarOpened ? null : menu;
    const overlayedMenu = sidebarOpened ? menu : null;

    return (
      <React.Fragment>
        <Responsive
          as={Sidebar.Pushable}
          getWidth={windowInnerWidth}
          maxWidth={Responsive.onlyMobile.maxWidth}
          className="sidebar-layout--mobile"
        >
          <Sidebar
            as={Menu}
            animation="overlay"
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={sidebarOpened}
            onClick={this.handleSidebarHide}
          >
            <UserMenu vertical />
            {this.props.menu}
            <SettingsMenu vertical />
            <AboutMenu vertical />
          </Sidebar>
          <Sidebar.Pusher dimmed={sidebarOpened} className="sidebar-layout__sidebar-pusher">
            <MainContainer>{children}</MainContainer>
            {overlayedMenu}
          </Sidebar.Pusher>
        </Responsive>
        <Responsive
          getWidth={windowInnerWidth}
          minWidth={Responsive.onlyTablet.minWidth}
          className="sidebar-layout--desktop"
        >
          <MainContainer>{children}</MainContainer>
        </Responsive>
        {rootMenu}
      </React.Fragment>
    );
  }
}

SideBarLayout.propTypes = {
  children: PropTypes.node,
  homeMenu: PropTypes.func,
  menu: PropTypes.node,
  settingsMenu: PropTypes.func,
  userMenu: PropTypes.func
};
