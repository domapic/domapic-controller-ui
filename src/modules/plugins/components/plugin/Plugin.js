import React from "react";
import PropTypes from "prop-types";

import { Component as Container } from "src/components/container-content";
import { Component as ServiceInfo } from "src/components/service-info";

export const Plugin = ({ plugin = {}, pluginLoading, pluginError }) => (
  <Container loading={pluginLoading} error={pluginError} background={true}>
    <Container.Header as="h3" loading={pluginLoading}>
      {plugin.name}
    </Container.Header>
    <Container.Content>
      <ServiceInfo service={plugin} loading={pluginLoading} />
    </Container.Content>
  </Container>
);

Plugin.propTypes = {
  plugin: PropTypes.any.isRequired,
  pluginError: PropTypes.instanceOf(Error),
  pluginLoading: PropTypes.bool.isRequired
};
