import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { Component as Container } from "src/components/container-content";
import { Component as LogsList } from "src/components/logs-list";
import { Component as Breadcrumbs } from "src/components/breadcrumbs";
import { Component as AbilityInfo } from "../ability-info";
import { Menu, Icon } from "semantic-ui-react";

const ACTIVITY = "activity";
const INFO = "info";

export const Ability = ({
  logs = [],
  logsError,
  logsLoading,
  ability = {},
  abilityLoading,
  abilityError,
  display = INFO,
  activityUrl,
  infoUrl,
  baseUrl
}) => {
  const subsection =
    display === ACTIVITY ? (
      <LogsList logs={logs} logsLoading={logsLoading} />
    ) : (
      <AbilityInfo ability={ability} loading={abilityLoading} />
    );
  const loading = display === ACTIVITY ? logsLoading : abilityLoading;
  const error = display === ACTIVITY ? logsError : abilityError;
  return (
    <Container loading={loading} error={error} background={true}>
      <Container.Header loading={abilityLoading}>
        <Breadcrumbs
          sections={[
            {
              icon: "bolt",
              url: baseUrl,
              text: "Abilities"
            },
            { url: infoUrl, text: ability.name },
            { text: display }
          ]}
        />
      </Container.Header>
      <Container.Menu>
        <Menu.Item active={display === INFO}>
          <Link to={infoUrl}>
            <Icon name="clipboard outline" /> Info
          </Link>
        </Menu.Item>
        <Menu.Item active={display === ACTIVITY}>
          <Link to={activityUrl}>
            <Icon name="history" /> Activity
          </Link>
        </Menu.Item>
      </Container.Menu>
      <Container.Content>{subsection}</Container.Content>
    </Container>
  );
};

Ability.propTypes = {
  ability: PropTypes.any.isRequired,
  abilityError: PropTypes.instanceOf(Error),
  abilityLoading: PropTypes.bool.isRequired,
  activityUrl: PropTypes.string,
  baseUrl: PropTypes.string,
  display: PropTypes.oneOf([ACTIVITY, INFO]),
  infoUrl: PropTypes.string,
  logs: PropTypes.any.isRequired,
  logsError: PropTypes.instanceOf(Error),
  logsLoading: PropTypes.bool.isRequired
};
