import React from "react";
import PropTypes from "prop-types";

import { Container, Responsive, Menu, Segment } from "semantic-ui-react";

import { Component as MainContainer } from "src/components/container-main";

import "./simpleLayout.css";

export const SimpleLayout = ({ children }) => (
  <Responsive>
    <Segment inverted textAlign="center" vertical className="main-menu">
      <Menu inverted={true} size="small" pointing={true} secondary={true}>
        <Container>
          <Menu.Item position="right">{/* TODO, add here right menu */}</Menu.Item>
        </Container>
      </Menu>
    </Segment>
    <MainContainer>{children}</MainContainer>
  </Responsive>
);

SimpleLayout.propTypes = {
  children: PropTypes.node
};
