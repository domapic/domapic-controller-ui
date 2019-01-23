import React from "react";
import PropTypes from "prop-types";

import { Container } from "semantic-ui-react";

import "./mainContainer.css";

export const MainContainer = ({ children }) => (
  <Container className="main-container">{children}</Container>
);

MainContainer.propTypes = {
  children: PropTypes.node
};
