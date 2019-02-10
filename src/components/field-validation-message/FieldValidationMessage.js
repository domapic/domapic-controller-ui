import React from "react";
import PropTypes from "prop-types";

import { Form, Label, Icon } from "semantic-ui-react";

import { Component as Responsive } from "src/components/responsive";

import "./fieldValidationMessage.css";

const ErrorLabel = ({ message, pointing }) => {
  return (
    <Label basic color="red" pointing={pointing}>
      {message}
    </Label>
  );
};

ErrorLabel.propTypes = {
  message: PropTypes.string,
  pointing: PropTypes.any
};

const ValidLabel = () => {
  return <Icon name="thumbs up" color="green" />;
};

export const FieldValidationMessage = ({ message, valid }) => {
  const Message = !valid ? ErrorLabel : ValidLabel;
  return (
    <React.Fragment>
      <Responsive device="desktop">
        <Form.Field className="form__field-validation__container">
          <Message pointing="left" message={message} />
        </Form.Field>
      </Responsive>
      <Responsive device="mobile">
        <Form.Field className="form__field-validation__container--mobile">
          {!valid ? <Message pointing message={message} /> : null}
        </Form.Field>
      </Responsive>
    </React.Fragment>
  );
};

FieldValidationMessage.propTypes = {
  message: PropTypes.string,
  valid: PropTypes.bool
};
