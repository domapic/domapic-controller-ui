import React, { Component } from "react";
import PropTypes from "prop-types";
import { debounce } from "lodash";

import { Button, Input, Dropdown } from "semantic-ui-react";

import "./abilityAction.css";

export const NoAction = () => <div className="ability-action__no-action">-</div>;

export class SingleAction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actionError: false
    };
    this.sendAction = this.sendAction.bind(this);
  }

  sendAction() {
    this.props.sendAbilityAction().catch(() => {
      this.setState(state => ({
        ...state,
        actionError: true
      }));
    });
  }

  render() {
    return (
      <Button
        fluid
        color="green"
        disabled={this.props.actionLoading}
        onClick={this.sendAction}
        loading={this.props.actionLoading}
      >
        Send
      </Button>
    );
  }
}

export class BooleanAction extends Component {
  constructor(props) {
    super(props);
    this.sendTrueAction = this.sendTrueAction.bind(this);
    this.sendFalseAction = this.sendFalseAction.bind(this);
    this.state = {
      actionError: false
    };
  }

  sendAction(value) {
    this.props.sendAbilityAction(value).catch(() => {
      this.setState(state => ({
        ...state,
        actionError: true
      }));
    });
  }

  sendTrueAction() {
    this.sendAction(true);
  }

  sendFalseAction() {
    this.sendAction(false);
  }

  render() {
    return (
      <Button.Group fluid>
        <Button
          disabled={this.props.actionLoading}
          onClick={this.sendFalseAction}
          loading={this.props.actionLoading}
        >
          Disable
        </Button>
        <Button.Or />
        <Button
          positive
          disabled={this.props.actionLoading}
          onClick={this.sendTrueAction}
          loading={this.props.actionLoading}
        >
          Enable
        </Button>
      </Button.Group>
    );
  }
}

export class AbilityActionValidated extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      error: null,
      showError: false,
      isValid: false,
      actionError: false
    };

    this.sendAction = this.sendAction.bind(this);
    this.handleChange = debounce(this.handleChange.bind(this), 100);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleChange(event, data) {
    const value = data.value.toString();
    const error = this.props.validateAbilityData(this.props.ability, value);
    this.setState(state => ({
      value,
      error,
      showError: value.length > 0 && (state.showError ? !!error : false),
      isValid: value.length > 0 && !error
    }));
  }

  handleBlur() {
    this.setState(state => ({
      ...state,
      showError: state.value.length > 0 && !!state.error
    }));
  }

  sendAction() {
    this.props.sendAbilityAction(this.state.value).catch(() => {
      this.setState(state => ({
        ...state,
        actionError: true
      }));
    });
  }
}

AbilityActionValidated.propTypes = {
  ability: PropTypes.any,
  sendAbilityAction: PropTypes.func,
  validateAbilityData: PropTypes.func
};

export class SelectAction extends AbilityActionValidated {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <Dropdown
          placeholder="Select value..."
          selection
          options={this.props.options.map(option => ({
            text: option,
            value: option
          }))}
          className="ability-action__select__dropdown"
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          error={this.state.showError}
          disabled={this.props.actionLoading}
        />
        <Button
          type="submit"
          color="green"
          className="ability-action__select__button"
          disabled={!this.state.isValid || this.props.actionLoading}
          onClick={this.sendAction}
          loading={this.props.actionLoading}
        >
          Send
        </Button>
      </React.Fragment>
    );
  }
}

SelectAction.propTypes = {
  options: PropTypes.array
};

export class StringAction extends AbilityActionValidated {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.ability.enum) {
      return <SelectAction options={this.props.ability.enum} {...this.props} />;
    }
    const type =
      this.props.ability.format === "email"
        ? "email"
        : this.props.ability.format === "uri"
        ? "url"
        : "text";
    return (
      <Input
        type={type}
        placeholder="Insert value..."
        action
        fluid
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        error={this.state.showError}
        maxLength={this.props.ability.maxLength}
        minLength={this.props.ability.minLength}
        disabled={this.props.actionLoading}
        className="ability-action__input"
      >
        <input />
        <Button
          type="submit"
          color="green"
          disabled={!this.state.isValid || this.props.actionLoading}
          onClick={this.sendAction}
          loading={this.props.actionLoading}
        >
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
      return <SelectAction options={this.props.ability.enum} {...this.props} />;
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
        disabled={this.props.actionLoading}
        className="ability-action__input"
      >
        <input />
        <Button
          type="submit"
          color="green"
          disabled={!this.state.isValid || this.props.actionLoading}
          onClick={this.sendAction}
          loading={this.props.actionLoading}
        >
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

export const AbilityAction = ({
  ability,
  validateAbilityData,
  sendAbilityAction,
  actionLoading
}) => {
  if (!ability.action) {
    return <NoAction />;
  }
  switch (ability.type) {
    case "boolean":
      return <BooleanAction sendAbilityAction={sendAbilityAction} actionLoading={actionLoading} />;
      break;
    case "string":
      return (
        <StringAction
          ability={ability}
          validateAbilityData={validateAbilityData}
          sendAbilityAction={sendAbilityAction}
          actionLoading={actionLoading}
        />
      );
      break;
    case "number":
    case "integer":
    case "float":
      return (
        <NumericAction
          ability={ability}
          validateAbilityData={validateAbilityData}
          sendAbilityAction={sendAbilityAction}
          actionLoading={actionLoading}
        />
      );
    default:
      return <SingleAction sendAbilityAction={sendAbilityAction} actionLoading={actionLoading} />;
  }
};

AbilityAction.propTypes = {
  ability: PropTypes.shape({
    type: PropTypes.string,
    action: PropTypes.bool
  })
};
