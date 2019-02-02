import React from "react";
import PropTypes from "prop-types";

import { Message } from "semantic-ui-react";

export const ErrorComponent = ({ children }) => (
  <Message negative size="large">
    {children}
  </Message>
);

ErrorComponent.propTypes = {
  children: PropTypes.node
};
