import React from "react";
import PropTypes from "prop-types";
import { Placeholder } from "semantic-ui-react";

import { Component as Container } from "src/components/container-content";

export const Module = ({ loading, module = {}, error }) => (
  <Container loading={loading} error={error}>
    <Container.Header as="h3" loading={loading}>
      {module.name}
    </Container.Header>
    <Container.Placeholder>
      <Placeholder.Paragraph>
        <Placeholder.Line />
        <Placeholder.Line />
      </Placeholder.Paragraph>
    </Container.Placeholder>
    <Container.Content>
      <p>Id: {module._id}</p>
      <p>Name: {module.name}</p>
    </Container.Content>
  </Container>
);

Module.propTypes = {
  error: PropTypes.instanceOf(Error),
  loading: PropTypes.bool.isRequired,
  module: PropTypes.any.isRequired
};
