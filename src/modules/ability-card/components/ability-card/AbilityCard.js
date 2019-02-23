import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { Card, Icon } from "semantic-ui-react";

import { AbilityState } from "./AbilityState";
import { AbilityAction } from "./AbilityAction";

import "./abilityCard.css";

export const AbilityCard = ({
  ability,
  baseUrl,
  state,
  stateError,
  stateLoading,
  validateAbilityData,
  sendAbilityAction,
  actionError,
  actionLoading
}) => (
  <Card fluid>
    <Card.Content as={Link} to={`${baseUrl}/${ability._id}`} className="ability__content">
      <div className="ability__data">
        <Card.Header className="ability__name">{ability.serviceName}</Card.Header>
        <Card.Meta className="ability__description">
          <span>{ability.description}</span>
        </Card.Meta>
        <div className="ability__settings">
          <Icon name="signal" floated="right" />
          {/* <a>
            <Icon name="star outline" />
          </a> */}
          <Link to={`${baseUrl}/${ability._id}`}>
            <Icon name="setting" />
          </Link>
        </div>
      </div>
      <AbilityState
        ability={ability}
        state={state}
        stateError={stateError}
        stateLoading={stateLoading}
      />
    </Card.Content>
    <Card.Content extra>
      <AbilityAction
        ability={ability}
        validateAbilityData={validateAbilityData}
        sendAbilityAction={sendAbilityAction}
        actionError={actionError}
        actionLoading={actionLoading}
      />
    </Card.Content>
  </Card>
);

AbilityCard.propTypes = {
  ability: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string
  }),
  actionError: PropTypes.instanceOf(Error),
  actionLoading: PropTypes.bool,
  baseUrl: PropTypes.string,
  sendAbilityAction: PropTypes.func,
  state: PropTypes.any,
  stateError: PropTypes.instanceOf(Error),
  stateLoading: PropTypes.bool,
  validateAbilityData: PropTypes.func
};
