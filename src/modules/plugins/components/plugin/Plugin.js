import React, { Component } from "react";
import PropTypes from "prop-types";

import { RoutesContext } from "src/contexts/RoutesContext";

import { Component as Container } from "src/components/container-content";
import { Component as ServiceInfo } from "src/components/service-info";
import { Component as Breadcrumbs } from "src/components/breadcrumbs";

export class Plugin extends Component {
  render() {
    const { plugin = {}, pluginLoading, pluginError } = this.props;

    return (
      <Container loading={pluginLoading} error={pluginError} background={true}>
        <Container.Header loading={pluginLoading}>
          <Breadcrumbs
            sections={[
              { url: this.context.plugins, text: "Plugins", icon: "plug" },
              {
                text: plugin.name
              }
            ]}
          />
        </Container.Header>
        <Container.Content>
          <ServiceInfo service={plugin} loading={pluginLoading} />
        </Container.Content>
      </Container>
    );
  }
}

Plugin.contextType = RoutesContext;

Plugin.propTypes = {
  plugin: PropTypes.any.isRequired,
  pluginError: PropTypes.instanceOf(Error),
  pluginLoading: PropTypes.bool.isRequired
};
