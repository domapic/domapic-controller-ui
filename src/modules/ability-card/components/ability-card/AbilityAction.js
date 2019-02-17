import React from "react";
import PropTypes from "prop-types";

import { Button, Input } from "semantic-ui-react";

import "./abilityAction.css";

export const BooleanAction = () => (
  <Button.Group fluid>
    <Button>Disable</Button>
    <Button.Or />
    <Button positive>Enable</Button>
  </Button.Group>
);

export const StringAction = () => (
  <Input type="text" placeholder="Insert value..." action fluid>
    <input />
    <Button type="submit" color="green">
      Send
    </Button>
  </Input>
);

export const NumericAction = () => (
  <Input type="number" placeholder="Insert number..." action fluid>
    <input />
    <Button type="submit" color="green">
      Send
    </Button>
  </Input>
);

export const SingleAction = () => (
  <Button fluid color="green">
    Send
  </Button>
);

export const NoAction = () => <div className="ability-action__no-action">-</div>;

export const AbilityAction = ({ ability }) => {
  if (!ability.action) {
    return <NoAction />;
  }
  switch (ability.type) {
    case "boolean":
      return <BooleanAction />;
      break;
    case "string":
      return <StringAction />;
      break;
    case "number":
    case "integer":
    case "float":
      return <NumericAction />;
    default:
      return <SingleAction />;
  }
};

AbilityAction.propTypes = {
  ability: PropTypes.shape({
    type: PropTypes.string
  })
};
