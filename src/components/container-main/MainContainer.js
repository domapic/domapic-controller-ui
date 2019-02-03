import React from "react";
import PropTypes from "prop-types";

import { Container } from "semantic-ui-react";

import "./mainContainer.css";

export const MainContainer = ({ children, mobile, dimmed }) => {
  return mobile ? (
    <div className={`main-container__mobile-wrapper ${dimmed ? "dimmed" : ""}`}>
      <Container className="main-container">{children}</Container>
    </div>
  ) : (
    <Container className="main-container">{children}</Container>
  );
};

MainContainer.propTypes = {
  children: PropTypes.node,
  dimmed: PropTypes.bool,
  mobile: PropTypes.bool
};
