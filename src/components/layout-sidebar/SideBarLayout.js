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
                {this.props.menu}
                <Menu.Item position="right" className="user-menu-item">
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
          {this.props.menu}
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened} className="sidebar">
          <Segment inverted textAlign="center" vertical className="main-menu">
            <Container>
              <Menu inverted pointing secondary size="small">
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name="sidebar" />
                </Menu.Item>
                <Menu.Item position="right" className="user-menu-item mobile">
                  <AboutMenu />
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
