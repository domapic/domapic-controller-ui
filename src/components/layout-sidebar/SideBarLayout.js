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
import { Component as UserMenu } from "src/components/menu-user";
import { Component as AboutMenu } from "src/components/menu-about";
import { Component as SettingsMenu } from "src/components/menu-settings";
import { Component as HomeMenu } from "src/components/menu-home";
import { Component as UserAvatar } from "src/components/user-avatar";
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

    return (
      <Responsive getWidth={windowInnerWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment inverted textAlign="center" vertical className="sidebar-desktop-menu">
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
                <Menu.Item position="right" className="right-menu-item">
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
  menu: PropTypes.node
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
        >
          <Menu.Item>
            <UserAvatar /> Javier Brea
          </Menu.Item>
          <Menu.Item>
            User
            <Menu.Menu>
              <Menu.Item>Account</Menu.Item>
              <Menu.Item>Logout</Menu.Item>
            </Menu.Menu>
          </Menu.Item>
          {this.props.menu}
          <Menu.Item>
            Settings
            <Menu.Menu>
              <Menu.Item>Configuration</Menu.Item>
              <Menu.Item>Users</Menu.Item>
            </Menu.Menu>
          </Menu.Item>
          <Menu.Item>
            About
            <Menu.Menu>
              <Menu.Item>Controller</Menu.Item>
              <Menu.Item>Api Swagger</Menu.Item>
            </Menu.Menu>
          </Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened} className="sidebar">
          <Segment inverted textAlign="center" vertical className="main-menu">
            <Container>
              <Menu inverted pointing secondary size="small" className="mobile">
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name="sidebar" />
                </Menu.Item>
                <HomeMenu />
                <Menu.Item position="right" className="right-menu-item mobile">
                  <UserMenu />
                </Menu.Item>
              </Menu>
            </Container>
          </Segment>
          {children}
        </Sidebar.Pusher>
      </Responsive>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
  menu: PropTypes.node
};

const ResponsiveContainer = ({ menu, children }) => (
  <div>
    <DesktopContainer menu={menu}>{children}</DesktopContainer>
    <MobileContainer menu={menu}>{children}</MobileContainer>
  </div>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
  menu: PropTypes.node
};

export const SideBarLayout = ({ menu, children }) => (
  <ResponsiveContainer menu={menu}>
    <MainContainer>{children}</MainContainer>
  </ResponsiveContainer>
);

SideBarLayout.propTypes = {
  children: PropTypes.node,
  menu: PropTypes.node
};
