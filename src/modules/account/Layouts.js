import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { UpdateUserMe } from "./views/UpdateUserMe";

// UPDATE USER

export const AccountBase = ({ history }) => <UpdateUserMe goBack={() => history.goBack()} />;

AccountBase.propTypes = {
  history: PropTypes.any
};

export const Account = withRouter(AccountBase);
