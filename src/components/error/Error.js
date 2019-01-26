import React from "react";
import PropTypes from "prop-types";

import { Message } from "semantic-ui-react";

export const ErrorComponent = ({ message }) => (
  <Message negative size="large">
    {message}
  </Message>
);

ErrorComponent.propTypes = {
  message: PropTypes.string.isRequired
};
