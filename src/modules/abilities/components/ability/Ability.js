import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { Component as Container } from "src/components/container-content";
import { Component as ScrollPaginatedList } from "src/components/scroll-paginated-list";
import { Component as LogsListTable } from "src/components/logs-list-table";
import { Component as Breadcrumbs } from "src/components/breadcrumbs";
import { Component as AbilityInfo } from "../ability-info";
import { Menu, Icon } from "semantic-ui-react";

const ACTIVITY = "activity";
const INFO = "info";

export const Ability = ({
  LogsList,
  abilityId,
  ability = {},
  abilityLoading,
  abilityError,
  display = INFO,
  activityUrl,
  infoUrl,
  baseUrl,
  logsPageSize,
  logsCount,
  logsCountLoading,
  logsCountError
}) => {
  const subsection =
    display === ACTIVITY ? (
      <ScrollPaginatedList
        List={LogsList}
        ListWrapper={LogsListTable}
        pageSize={logsPageSize}
        itemsCount={logsCount}
        itemsCountLoading={logsCountLoading}
        itemsCountError={logsCountError}
        extraFilter={{ abilityId }}
      />
    ) : (
      <AbilityInfo ability={ability} loading={abilityLoading} />
    );
  const loading = display === ACTIVITY ? null : abilityLoading;
  const error = display === ACTIVITY ? null : abilityError;
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
  LogsList: PropTypes.func,
  ability: PropTypes.any.isRequired,
  abilityError: PropTypes.instanceOf(Error),
  abilityId: PropTypes.string,
  abilityLoading: PropTypes.bool.isRequired,
  activityUrl: PropTypes.string,
  baseUrl: PropTypes.string,
  display: PropTypes.oneOf([ACTIVITY, INFO]),
  infoUrl: PropTypes.string,
  logsCount: PropTypes.any,
  logsCountError: PropTypes.instanceOf(Error),
  logsCountLoading: PropTypes.bool,
  logsPageSize: PropTypes.number
};
