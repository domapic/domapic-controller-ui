import React from "react";
import PropTypes from "prop-types";

import { UserMenuVertical } from "./UserMenuVertical";
import { UserMenuDropdown } from "./UserMenuDropdown";

export const UserMenu = ({ vertical }) => {
  if (vertical) {
    return <UserMenuVertical />;
  }
  return <UserMenuDropdown />;
};

UserMenu.propTypes = {
  vertical: PropTypes.bool
};
