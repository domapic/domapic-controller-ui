import React from "react";
import PropTypes from "prop-types";

import { Container, Responsive, Menu, Segment } from "semantic-ui-react";

import { Component as MainContainer } from "src/components/container-main";
import { Component as AboutMenu } from "src/components/menu-about";
import { Component as HomeMenu } from "src/components/menu-home";

import "./simpleLayout.css";

export const SimpleLayout = ({ children }) => (
  <Responsive>
    <Segment inverted textAlign="center" vertical className="simple-layout__header-menu">
      <Menu inverted={true} size="small" pointing={true} secondary={true}>
        <Container>
          <HomeMenu />
          <Menu.Item position="right" className="simple-layout__header-menu__item--right">
            <AboutMenu />
          </Menu.Item>
        </Container>
      </Menu>
    </Segment>
    <MainContainer>{children}</MainContainer>
  </Responsive>
);

SimpleLayout.propTypes = {
  children: PropTypes.node
};
