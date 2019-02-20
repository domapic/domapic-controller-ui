import React from "react";
import PropTypes from "prop-types";

import { Component as ContentContainer } from "src/components/container-content";

export const Account = ({ user, goBack, userLoading, userError, UpdateUser }) =>
  user._id ? (
    <UpdateUser id={user._id} onCancel={goBack} />
  ) : (
    <ContentContainer loading={userLoading} error={userError} background={true}>
      <ContentContainer.Header as="h3">Modify User</ContentContainer.Header>
    </ContentContainer>
  );

Account.propTypes = {
  UpdateUser: PropTypes.func,
  goBack: PropTypes.func,
  user: PropTypes.any,
  userError: PropTypes.bool,
  userLoading: PropTypes.bool
};
