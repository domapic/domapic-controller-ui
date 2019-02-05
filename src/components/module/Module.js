import React from "react";
import PropTypes from "prop-types";

import { Component as Container } from "src/components/container-content";
import { Component as ServiceInfo } from "src/components/service-info";

export const Module = ({ loading, module = {}, error }) => (
  <Container loading={loading} error={error}>
    <Container.Header as="h3" loading={loading}>
      {module.name}
    </Container.Header>
    <Container.Menu />
    <Container.Content>
      <ServiceInfo service={module} loading={loading} />
    </Container.Content>
  </Container>
);

Module.propTypes = {
  error: PropTypes.instanceOf(Error),
  loading: PropTypes.bool.isRequired,
  module: PropTypes.any.isRequired
};
