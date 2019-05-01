import React from "react";

import PropTypes from "prop-types";

import { Confirm, Header, Icon } from "semantic-ui-react";

export const ConfirmDelete = ({ isOpen, text, onCancel, onConfirm }) => (
  <Confirm
    open={isOpen}
    header={
      <Header as="h2">
        <Icon name="warning" color="red" />
        <Header.Content>Danger zone</Header.Content>
      </Header>
    }
    content={`You are going to delete the ${text}. This can't be undone. Are you sure?`}
    onCancel={onCancel}
    onConfirm={onConfirm}
  />
);

ConfirmDelete.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  text: PropTypes.string.isRequired
};
