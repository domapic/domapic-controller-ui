import React from "react";
import PropTypes from "prop-types";

export const SideBarLayout = ({ header, menu, content }) => (
  <div>
    <div className="header-container">{header}</div>
    <div className="menu-container">{menu}</div>
    <div className="main-container">{content}</div>
  </div>
);

SideBarLayout.propTypes = {
  content: PropTypes.element,
  header: PropTypes.element,
  menu: PropTypes.element
};
