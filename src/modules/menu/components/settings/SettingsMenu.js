import React from "react";
import PropTypes from "prop-types";

import { SettingsMenuDropdown } from "./SettingsMenuDropdown";
import { SettingsMenuVertical } from "./SettingsMenuVertical";

export const SettingsMenu = ({ vertical, userMeIsAdmin }) => {
  if (!userMeIsAdmin) {
    return null;
  }
  if (vertical) {
    return <SettingsMenuVertical />;
  }
  return <SettingsMenuDropdown />;
};

SettingsMenu.propTypes = {
  userMeIsAdmin: PropTypes.bool,
  vertical: PropTypes.bool
};
