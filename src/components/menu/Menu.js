import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const MenuLink = ({ name, route }) => <Link to={route}>{name}</Link>;

MenuLink.propTypes = {
  name: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired
};

export const Menu = ({ sections = [] }) => (
  <nav>
    <ul>
      {sections.map(section => (
        <li key={section.route}>
          <MenuLink name={section.name} route={section.route} />
        </li>
      ))}
    </ul>
  </nav>
);

Menu.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      route: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  )
};
