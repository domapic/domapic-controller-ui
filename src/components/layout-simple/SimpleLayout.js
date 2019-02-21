import React from "react";
import PropTypes from "prop-types";

import { Menu as SemanticMenu } from "semantic-ui-react";

import { Component as MainContainer } from "src/components/container-main";

import "./simpleLayout.css";

export const SimpleLayout = ({ children, Menu }) => {
  return (
    <React.Fragment>
      <MainContainer>{children}</MainContainer>
      <SemanticMenu
        inverted={true}
        size="small"
        fixed="top"
        className="simple-layout__header-menu"
      >
        <Menu.Home />
        <SemanticMenu.Item position="right" className="simple-layout__header-menu__item--right">
          <Menu.About />
        </SemanticMenu.Item>
      </SemanticMenu>
    </React.Fragment>
  );
};

SimpleLayout.propTypes = {
  Menu: PropTypes.func,
  children: PropTypes.node
};
