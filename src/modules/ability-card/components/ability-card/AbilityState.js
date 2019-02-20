import React from "react";
import PropTypes from "prop-types";
import { trim } from "lodash";

import { Icon, Statistic, Loader } from "semantic-ui-react";

import "./abilityState.css";

const valueLength = value => trim(value.toString()).length;

const stateClassName = value => {
  const displayLength = valueLength(value);
  if (displayLength < 4) {
    return "";
  }
  if (displayLength < 5) {
    return "small";
  }
  if (displayLength < 7) {
    return "tiny";
  }
  return "mini";
};

const stripValue = value => {
  const newValue = trim(value.toString());
  const displayLength = valueLength(newValue);
  if (displayLength > 17) {
    return `${newValue.substring(0, 16)}...`;
  }
  return newValue;
};

export const StateDisplay = ({ state, ability }) => {
  let value;
  let stateClass = "";
  if (!state || !state.hasOwnProperty("data")) {
    value = "-";
  } else if (ability.type === "number") {
    stateClass = stateClassName(state.data);
    value = stripValue(state.data);
  } else if (ability.type === "string") {
    stateClass = stateClassName(state.data);
    value = stripValue(state.data);
  } else if (ability.type === "boolean") {
    stateClass = "icon";
    value = <Icon name="circle" color={state.data ? "green" : "grey"} />;
  }

  return <Statistic.Value className={stateClass}>{value}</Statistic.Value>;
};

StateDisplay.propTypes = {
  ability: PropTypes.shape({
    type: PropTypes.string
  }),
  state: PropTypes.any
};

export const AbilityState = ({ ability, stateLoading, stateError, state }) => {
  const stateValue = !stateLoading ? (
    !stateError ? (
      <StateDisplay state={state} ability={ability} />
    ) : (
      <Statistic.Value className="icon error">
        <Icon name="warning sign" color="red" />
      </Statistic.Value>
    )
  ) : null;
  return (
    <Statistic className="ability__state" floated="right">
      <Statistic.Label>{ability.name}</Statistic.Label>
      {stateValue}
      <Loader active={stateLoading} />
    </Statistic>
  );
};

AbilityState.propTypes = {
  ability: PropTypes.shape({
    name: PropTypes.string
  }),
  state: PropTypes.any,
  stateError: PropTypes.bool,
  stateLoading: PropTypes.bool
};
