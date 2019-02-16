import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { Menu as SemanticMenu } from "semantic-ui-react";

import "./menuSections.css";

export const MenuLink = ({ name, route }) => <Link to={route}>{name}</Link>;

MenuLink.propTypes = {
  name: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired
};

export const MenuSections = ({ sections = [] }) => (
  <React.Fragment>
    {sections.map(section => (
      <SemanticMenu.Item key={section.route} className="sections-menu__item">
        <Link to={section.route}>{section.name}</Link>
      </SemanticMenu.Item>
    ))}
  </React.Fragment>
);

MenuSections.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      route: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  )
};
