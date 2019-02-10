import React from "react";
import PropTypes from "prop-types";

import { Form, Label } from "semantic-ui-react";

import { Component as Responsive } from "src/components/responsive";

import "./fieldValidationMessage.css";

export const FieldValidationMessage = ({ message }) => (
  <React.Fragment>
    <Responsive device="desktop">
      <Form.Field className="form__field-validation__container">
        <Label basic color="red" pointing="left">
          {message}
        </Label>
      </Form.Field>
    </Responsive>
    <Responsive device="mobile">
      <Form.Field className="form__field-validation__container--mobile">
        <Label basic color="red" pointing>
          {message}
        </Label>
      </Form.Field>
    </Responsive>
  </React.Fragment>
);

FieldValidationMessage.propTypes = {
  message: PropTypes.string
};
