import React from "react";
import PropTypes from "prop-types";

import { SettingsMenuDropdown } from "./SettingsMenuDropdown";
import { SettingsMenuVertical } from "./SettingsMenuVertical";

export const SettingsMenu = ({ vertical }) => {
  if (vertical) {
    return <SettingsMenuVertical />;
  }
  return <SettingsMenuDropdown />;
};

SettingsMenu.propTypes = {
  vertical: PropTypes.bool
};
