import React from "react";
import PropTypes from "prop-types";

import { Label } from "semantic-ui-react";

import "./abilityActionValidationError.css";

export const AbilityActionValidationError = ({ error, showError }) => {
  if (!showError) {
    return null;
  }
  return (
    <Label color="red" pointing="below" floating className="ability-action__label--validation">
      {error}
    </Label>
  );
};

AbilityActionValidationError.propTypes = {
  error: PropTypes.string,
  showError: PropTypes.bool
};
