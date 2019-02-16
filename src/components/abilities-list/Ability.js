import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { Card, Icon, Statistic, Button } from "semantic-ui-react";

import "./abilityState.css";

export const AbilityState = () => (
  <Statistic className="ability__state" floated="right">
    <Statistic.Value>23</Statistic.Value>
  </Statistic>
);

export const AbilityAction = () => (
  <Button.Group fluid>
    <Button>Enable</Button>
    <Button.Or />
    <Button positive>Disable</Button>
  </Button.Group>
);

export const Ability = ({ ability, baseUrl }) => (
  <Card fluid>
    <Card.Content>
      <div className="ability__data">
        <Card.Header className="ability__name">{ability.name}</Card.Header>
        <Card.Meta className="ability__description">
          <span>{ability.description}</span>
        </Card.Meta>
        <div className="ability__settings">
          <Icon name="signal" />
          <a>
            <Icon name="star outline" />
          </a>
          <Link to={`${baseUrl}/${ability._id}`}>
            <Icon name="setting" />
          </Link>
        </div>
      </div>
      <AbilityState />
    </Card.Content>
    <Card.Content extra>
      <AbilityAction />
    </Card.Content>
  </Card>
);

Ability.propTypes = {
  ability: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string
  }),
  baseUrl: PropTypes.string
};
