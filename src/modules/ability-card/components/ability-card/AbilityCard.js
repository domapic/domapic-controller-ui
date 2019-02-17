import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { Card, Icon, Statistic, Button } from "semantic-ui-react";

import "./abilityCard.css";

export const AbilityState = ({ ability }) => (
  <Statistic className="ability__state" floated="right">
    <Statistic.Label>{ability.name}</Statistic.Label>
    <Statistic.Value>23</Statistic.Value>
  </Statistic>
);

AbilityState.propTypes = {
  ability: PropTypes.shape({
    name: PropTypes.string
  })
};

export const AbilityAction = () => (
  <Button.Group fluid>
    <Button>Enable</Button>
    <Button.Or />
    <Button positive>Disable</Button>
  </Button.Group>
);

export const AbilityCard = ({ ability, baseUrl }) => (
  <Card fluid>
    <Card.Content>
      <div className="ability__data">
        <Card.Header className="ability__name">{ability.serviceName}</Card.Header>
        <Card.Meta className="ability__description">
          <span>{ability.description}</span>
        </Card.Meta>
        <div className="ability__settings">
          <Icon name="signal" floated="right" />
          <a>
            <Icon name="star outline" />
          </a>
          <Link to={`${baseUrl}/${ability._id}`}>
            <Icon name="setting" />
          </Link>
        </div>
      </div>
      <AbilityState ability={ability} />
    </Card.Content>
    <Card.Content extra>
      <AbilityAction />
    </Card.Content>
  </Card>
);

AbilityCard.propTypes = {
  ability: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string
  }),
  baseUrl: PropTypes.string
};
