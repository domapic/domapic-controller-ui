import React from "react";
import PropTypes from "prop-types";

import { UserMenuVertical } from "./UserMenuVertical";
import { UserMenuDropdown } from "./UserMenuDropdown";

export const UserMenu = ({ vertical, doLogout, ...rest }) => {
  if (vertical) {
    return <UserMenuVertical logoutHandler={doLogout} {...rest} />;
  }
  return <UserMenuDropdown logoutHandler={doLogout} {...rest} />;
};

UserMenu.propTypes = {
  doLogout: PropTypes.func,
  error: PropTypes.any,
  loading: PropTypes.bool,
  user: PropTypes.any,
  vertical: PropTypes.bool
};
