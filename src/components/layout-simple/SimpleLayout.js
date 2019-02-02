import React from "react";
import PropTypes from "prop-types";

import { Menu } from "semantic-ui-react";

import { Component as MainContainer } from "src/components/container-main";
import { Component as AboutMenu } from "src/components/menu-about";

export const SimpleLayout = ({ children, homeMenu = () => {} }) => {
  const HomeMenu = homeMenu;
  return (
    <React.Fragment>
      <MainContainer>{children}</MainContainer>
      <Menu inverted={true} size="small" fixed="top" className="simple-layout__header-menu">
        <HomeMenu />
        <Menu.Item position="right" className="simple-layout__header-menu__item--right">
          <AboutMenu />
        </Menu.Item>
      </Menu>
    </React.Fragment>
  );
};

SimpleLayout.propTypes = {
  children: PropTypes.node,
  homeMenu: PropTypes.func
};
