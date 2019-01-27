import React from "react";
import PropTypes from "prop-types";

import { UserMenuVertical } from "./UserMenuVertical";
import { UserMenuDropdown } from "./UserMenuDropdown";

const logout = event => {
  event.preventDefault();
  console.log("User logout");
};

export const UserMenu = ({ vertical }) => {
  if (vertical) {
    return <UserMenuVertical logoutHandler={logout} />;
  }
  return <UserMenuDropdown logoutHandler={logout} />;
};

UserMenu.propTypes = {
  vertical: PropTypes.bool
};
