import React from "react";

import PropTypes from "prop-types";

export const SimpleLayout = ({ header, content }) => (
  <div>
    <div className="header-container">{header}</div>
    <div className="main-container">{content}</div>
  </div>
);

SimpleLayout.propTypes = {
  content: PropTypes.element,
  header: PropTypes.element
};
