import React from "react";
import PropTypes from "prop-types";

import { Container, Responsive, Menu } from "semantic-ui-react";

import { Component as MainContainer } from "src/components/container-main";
import { Component as AboutMenu } from "src/components/menu-about";

export const SimpleLayout = ({ children, homeMenu = () => {} }) => {
  const HomeMenu = homeMenu;
  return (
    <Responsive>
      <MainContainer>{children}</MainContainer>
      <Menu inverted={true} size="small" fixed="top" className="simple-layout__header-menu">
        <Container>
          <HomeMenu />
          <Menu.Item position="right" className="simple-layout__header-menu__item--right">
            <AboutMenu />
          </Menu.Item>
        </Container>
      </Menu>
    </Responsive>
  );
};

SimpleLayout.propTypes = {
  children: PropTypes.node,
  homeMenu: PropTypes.func
};
