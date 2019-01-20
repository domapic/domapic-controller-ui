import React from "react";
import PropTypes from "prop-types";

export const Module = ({ id }) => (
  <div>
    <h2> Module </h2>
    <p>Id: {id}</p>
  </div>
);

Module.propTypes = {
  id: PropTypes.string
};
