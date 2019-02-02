import React from "react";
import PropTypes from "prop-types";

import { SettingsMenuDropdown } from "./SettingsMenuDropdown";
import { SettingsMenuVertical } from "./SettingsMenuVertical";

export const SettingsMenu = ({ vertical, userIsAdmin }) => {
  if (!userIsAdmin) {
    return null;
  }
  if (vertical) {
    return <SettingsMenuVertical />;
  }
  return <SettingsMenuDropdown />;
};

SettingsMenu.propTypes = {
  userIsAdmin: PropTypes.bool,
  vertical: PropTypes.bool
};
