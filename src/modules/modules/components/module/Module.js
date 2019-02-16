import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { Component as Container } from "src/components/container-content";
import { Component as ServiceInfo } from "src/components/service-info";
import { Component as Abilities } from "src/components/abilities-list";
import { Menu } from "semantic-ui-react";

const ABILITIES = "abilities";
const INFO = "info";

export const Module = ({
  abilities = [],
  abilitiesError,
  abilitiesLoading,
  module = {},
  moduleLoading,
  moduleError,
  display = ABILITIES,
  abilitiesUrl,
  infoUrl,
  abilitiesLinkBaseUrl
}) => {
  const subsection =
    display === INFO ? (
      <ServiceInfo service={module} loading={moduleLoading} />
    ) : (
      <Abilities baseUrl={abilitiesLinkBaseUrl} abilities={abilities} />
    );
  const background = display === INFO;
  return (
    <Container
      loading={moduleLoading || abilitiesLoading}
      error={moduleError || abilitiesError}
      background={background}
    >
      <Container.Header as="h3" loading={moduleLoading}>
        {module.name}
      </Container.Header>
      <Container.Menu>
        <Menu.Item active={display === ABILITIES}>
          <Link to={abilitiesUrl}>Abilities</Link>
        </Menu.Item>
        <Menu.Item active={display === INFO}>
          <Link to={infoUrl}>Info</Link>
        </Menu.Item>
      </Container.Menu>
      <Container.Content>{subsection}</Container.Content>
    </Container>
  );
};

Module.propTypes = {
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
