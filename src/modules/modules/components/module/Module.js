import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { RoutesContext } from "src/contexts/RoutesContext";
import { Component as Container } from "src/components/container-content";
import { Component as ServiceInfo } from "src/components/service-info";
import { Component as Abilities } from "src/components/abilities-list";
import { Component as Breadcrumbs } from "src/components/breadcrumbs";
import { Menu, Icon } from "semantic-ui-react";

const ABILITIES = "abilities";
const INFO = "info";

export class Module extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      abilities = [],
      abilitiesError,
      abilitiesLoading,
      module = {},
      moduleLoading,
      moduleError,
      display = ABILITIES,
      abilitiesUrl,
      infoUrl,
      abilitiesLinkBaseUrl,
      AbilityCard
    } = this.props;
    const subsection =
      display === INFO ? (
        <ServiceInfo service={module} loading={moduleLoading} />
      ) : (
        <Abilities
          baseUrl={abilitiesLinkBaseUrl}
          abilities={abilities}
          AbilityCard={AbilityCard}
          abilitiesLoading={abilitiesLoading}
          avoidShowLoading={true}
        />
      );
    const background = display === INFO;
    const loading = display === INFO ? moduleLoading : abilitiesLoading;
    const error = display === INFO ? moduleError : abilitiesError;
    return (
      <Container loading={loading} error={error} background={background}>
        <Container.Header loading={moduleLoading}>
          <Breadcrumbs
            sections={[
              { url: this.context.modules, text: "Modules", icon: "cube" },
              {
                url: abilitiesUrl,
                text: module.name
              },
              {
                text: display
              }
            ]}
          />
        </Container.Header>
        <Container.Menu>
          <Menu.Item active={display === ABILITIES}>
            <Link to={abilitiesUrl}>
              <Icon name="bolt" /> Abilities
            </Link>
          </Menu.Item>
          <Menu.Item active={display === INFO}>
            <Link to={infoUrl}>
              <Icon name="clipboard outline" /> Info
            </Link>
          </Menu.Item>
        </Container.Menu>
        <Container.Content>{subsection}</Container.Content>
      </Container>
    );
  }
}

Module.contextType = RoutesContext;

Module.propTypes = {
  AbilityCard: PropTypes.func,
  abilities: PropTypes.any.isRequired,
  abilitiesError: PropTypes.instanceOf(Error),
  abilitiesLinkBaseUrl: PropTypes.string,
  abilitiesLoading: PropTypes.bool.isRequired,
  abilitiesUrl: PropTypes.string,
  display: PropTypes.oneOf([ABILITIES, INFO]),
  infoUrl: PropTypes.string,
  module: PropTypes.any.isRequired,
  moduleError: PropTypes.instanceOf(Error),
  moduleLoading: PropTypes.bool.isRequired
};
