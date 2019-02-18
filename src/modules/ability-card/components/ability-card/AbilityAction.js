import React, { Component } from "react";
import PropTypes from "prop-types";
import { debounce } from "lodash";

import { Button, Input, Dropdown } from "semantic-ui-react";

import "./abilityAction.css";

export class AbilityActionValidated extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      showError: false,
      isValid: false
    };

    this.handleChange = debounce(this.handleChange.bind(this), 100);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleChange(event, data) {
    const error = this.props.validateAbilityData(this.props.ability, data.value);
    this.setState(state => ({
      error,
      showError: state.showError ? !!error : false,
      isValid: data.value.length && !error
    }));
  }

  handleBlur() {
    this.setState(state => ({
      ...state,
      showError: !!state.error
    }));
  }
}

AbilityActionValidated.propTypes = {
  ability: PropTypes.any,
  validateAbilityData: PropTypes.func
};

export const BooleanAction = () => (
  <Button.Group fluid>
    <Button>Disable</Button>
    <Button.Or />
    <Button positive>Enable</Button>
  </Button.Group>
);

export const SelectAction = ({ options }) => {
  return (
    <React.Fragment>
      <Dropdown
        placeholder="Select value..."
        selection
        options={options.map(option => ({
          text: option,
          value: option
        }))}
        className="ability-action__select__dropdown"
      />
      <Button type="submit" color="green" className="ability-action__select__button">
        Send
      </Button>
    </React.Fragment>
  );
};

SelectAction.propTypes = {
  options: PropTypes.array
};

export class StringAction extends AbilityActionValidated {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.ability.enum) {
      return <SelectAction options={this.props.ability.enum} />;
    }
    return (
      <Input
        type="text"
        placeholder="Insert value..."
        action
        fluid
        onChange={this.handleChange}
        onBlur={this.handleBlur}
      >
        <input />
        <Button type="submit" color="green" disabled={!this.state.isValid}>
          Send
        </Button>
      </Input>
    );
  }
}

StringAction.propTypes = {
  ability: PropTypes.shape({
    type: PropTypes.string
  })
};

export class NumericAction extends AbilityActionValidated {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.ability.enum) {
      return <SelectAction options={this.props.ability.enum} />;
    }
    return (
      <Input
        type="number"
        placeholder="Insert number..."
        action
        fluid
        max={this.props.ability.maxValue}
        min={this.props.ability.minValue}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        error={this.state.showError}
      >
        <input />
        <Button type="submit" color="green" disabled={!this.state.isValid}>
          Send
        </Button>
      </Input>
    );
  }
}

NumericAction.propTypes = {
  ability: PropTypes.shape({
    enum: PropTypes.array,
    maxValue: PropTypes.number,
    minValue: PropTypes.number
  }),
  validateAbilityData: PropTypes.func
};

export const SingleAction = () => (
  <Button fluid color="green">
    Send
  </Button>
);

export const NoAction = () => <div className="ability-action__no-action">-</div>;

export const AbilityAction = ({ ability, validateAbilityData }) => {
  if (!ability.action) {
    return <NoAction />;
  }
  switch (ability.type) {
    case "boolean":
      return <BooleanAction />;
      break;
    case "string":
      return <StringAction ability={ability} validateAbilityData={validateAbilityData} />;
      break;
    case "number":
    case "integer":
    case "float":
      return <NumericAction ability={ability} validateAbilityData={validateAbilityData} />;
    default:
      return <SingleAction />;
  }
};

AbilityAction.propTypes = {
  ability: PropTypes.shape({
    type: PropTypes.string
  })
};
