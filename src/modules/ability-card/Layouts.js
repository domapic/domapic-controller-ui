import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { AbilityCard as AbilityCardView } from "./views/AbilityCard";

export const AbilityCardBase = ({ history, ...rest }) => (
  <AbilityCardView history={history} {...rest} />
);

AbilityCardBase.propTypes = {
  history: PropTypes.any
};

export const AbilityCard = withRouter(AbilityCardBase);
