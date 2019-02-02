import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Container,
  Icon,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility
} from "semantic-ui-react";

import { Component as MainContainer } from "src/components/container-main";
import { Component as AboutMenu } from "src/components/menu-about";
import { Component as HomeMenu } from "src/components/menu-home";
import { windowInnerWidth } from "src/helpers/responsive";

import "./sideBarLayout.css";

class DesktopContainer extends Component {
  constructor() {
    super();
    this.state = {};
    this.hideFixedMenu = this.hideFixedMenu.bind(this);
    this.showFixedMenu = this.showFixedMenu.bind(this);
  }

  hideFixedMenu() {
    this.setState({ fixed: false });
  }

  showFixedMenu() {
    this.setState({ fixed: true });
  }

  render() {
    const { children } = this.props;
    const { fixed } = this.state;
    const UserMenu = this.props.userMenu;
    const SettingsMenu = this.props.settingsMenu;

    return (
      <Responsive getWidth={windowInnerWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment inverted textAlign="center" vertical className="sidebar-layout__header-menu">
            <Menu
              fixed={fixed ? "top" : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size="small"
            >
              <Container>
                <HomeMenu />
                {this.props.menu}
                <Menu.Item position="right" className="sidebar-layout__header-menu__item--right">
                  <SettingsMenu />
                  <AboutMenu />
                  <UserMenu />
                </Menu.Item>
              </Container>
            </Menu>
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
  menu: PropTypes.node,
  settingsMenu: PropTypes.func,
  userMenu: PropTypes.func
};

class MobileContainer extends Component {
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

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={windowInnerWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation="push"
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
          <Segment
            inverted
            textAlign="center"
            vertical
            className="sidebar-layout__header-menu--mobile"
          >
            <Menu inverted pointing secondary size="small">
              <Menu.Item
                onClick={this.handleToggle}
                className="sidebar-layout__header-menu__item--toggle"
              >
                <Icon name="sidebar" />
              </Menu.Item>
              <HomeMenu />
              <Menu.Item position="right" className="sidebar-layout__header-menu__item--right">
                <UserMenu />
              </Menu.Item>
            </Menu>
          </Segment>
          {children}
        </Sidebar.Pusher>
      </Responsive>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
  menu: PropTypes.node,
  settingsMenu: PropTypes.func,
  userMenu: PropTypes.func
};

const ResponsiveContainer = ({ menu, userMenu, settingsMenu, children }) => (
  <div>
    <DesktopContainer menu={menu} userMenu={userMenu} settingsMenu={settingsMenu}>
      {children}
    </DesktopContainer>
    <MobileContainer menu={menu} userMenu={userMenu} settingsMenu={settingsMenu}>
      {children}
    </MobileContainer>
  </div>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
  menu: PropTypes.node,
  settingsMenu: PropTypes.func,
  userMenu: PropTypes.func
};

export const SideBarLayout = ({ menu, userMenu, settingsMenu, children }) => (
  <ResponsiveContainer menu={menu} userMenu={userMenu} settingsMenu={settingsMenu}>
    <MainContainer>{children}</MainContainer>
  </ResponsiveContainer>
);

SideBarLayout.propTypes = {
  children: PropTypes.node,
  menu: PropTypes.node,
  settingsMenu: PropTypes.func,
  userMenu: PropTypes.func
};
