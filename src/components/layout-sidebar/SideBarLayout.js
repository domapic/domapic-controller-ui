import React, { Component } from "react";
import PropTypes from "prop-types";
import { Menu as SemanticMenu, Sidebar } from "semantic-ui-react";

import { Component as MainContainer } from "src/components/container-main";
import { Component as Responsive } from "src/components/responsive";

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
    const Menu = this.props.Menu;

    const headerMenu = <HeaderMenu {...this.props} handleToggle={this.handleToggle} />;

    const rootMenu = sidebarOpened ? null : headerMenu;
    const overlayedMenu = sidebarOpened ? headerMenu : null;

    return (
      <React.Fragment>
        <Responsive as={Sidebar.Pushable} device="mobile" className="sidebar-layout--mobile">
          <Sidebar
            as={SemanticMenu}
            animation="overlay"
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={sidebarOpened}
            onClick={this.handleSidebarHide}
          >
            <Menu.User vertical />
            <Menu.Sections sections={this.props.sections} />
            <Menu.Settings vertical />
            <Menu.About vertical />
          </Sidebar>
          <Sidebar.Pusher dimmed={sidebarOpened} className="sidebar-layout__sidebar-pusher">
            <MainContainer mobile={true} dimmed={sidebarOpened}>
              {children}
            </MainContainer>
            {overlayedMenu}
          </Sidebar.Pusher>
        </Responsive>
        <Responsive device="tablet-and-desktop" className="sidebar-layout--desktop">
          <MainContainer mobile={false}>{children}</MainContainer>
        </Responsive>
        {rootMenu}
      </React.Fragment>
    );
  }
}

SideBarLayout.propTypes = {
  Menu: PropTypes.func,
  children: PropTypes.node,
  sections: PropTypes.array
};
