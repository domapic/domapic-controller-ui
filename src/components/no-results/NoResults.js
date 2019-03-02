import React from "react";
import PropTypes from "prop-types";

import { Message } from "semantic-ui-react";

import "./noResults.css";

export const NoResults = ({ text }) => (
  <Message size="large" className="no-results">
    {text}
  </Message>
);

NoResults.propTypes = {
  text: PropTypes.string
};
