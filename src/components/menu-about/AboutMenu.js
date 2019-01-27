import React from "react";
import PropTypes from "prop-types";

import { AboutMenuDropdown } from "./AboutMenuDropdown";
import { AboutMenuVertical } from "./AboutMenuVertical";

export const AboutMenu = ({ vertical }) => {
  if (vertical) {
    return <AboutMenuVertical />;
  }
  return <AboutMenuDropdown />;
};

AboutMenu.propTypes = {
  vertical: PropTypes.bool
};
