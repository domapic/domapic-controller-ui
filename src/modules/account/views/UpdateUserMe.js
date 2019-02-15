import React from "react";
import PropTypes from "prop-types";
import { plugins } from "reactive-data-source";

import { UpdateUser } from "./UpdateUser";

import { userMe } from "src/data-layer/users";

export const UpdateUserMeComponent = ({ user, goBack }) =>
  user._id ? <UpdateUser id={user._id} onCancel={goBack} /> : null;

UpdateUserMeComponent.propTypes = {
  goBack: PropTypes.func,
  user: PropTypes.any
};

export const mapDataSourceToProps = () => ({
  user: userMe.read.getters.value
});

export const UpdateUserMe = plugins.connect(mapDataSourceToProps)(UpdateUserMeComponent);
