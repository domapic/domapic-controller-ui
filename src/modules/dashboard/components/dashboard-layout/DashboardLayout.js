import React, { Component } from "react";
import PropTypes from "prop-types";

import { Segment } from "semantic-ui-react";

import { Component as Container } from "src/components/container-content";
import { Component as AbilitiesList } from "src/components/abilities-list";
import { Component as Breadcrumbs } from "src/components/breadcrumbs";
import { Component as LogsListTable } from "src/components/logs-list-table";
import { Component as LogsList } from "src/components/logs-list";
import { Component as ErrorComponent } from "src/components/error";

export class DashboardLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logsLoaded: props.logsLoading
    };
  }

  componentDidUpdate() {
    if (!this.state.logsLoaded && this.props.logsLoading === false) {
      this.setState({
        logsLoaded: true
      });
    }
  }

  render() {
    const {
      abilities,
      abilitiesBaseUrl,
      abilitiesLoading,
      abilitiesError,
      logs,
      logsLoading,
      logsError,
      AbilityCard
    } = this.props;
    return (
      <Container>
        <Container.Header>
          <Breadcrumbs
            sections={[
              {
                text: "Dashboard",
                icon: "tachometer alternate"
              }
            ]}
          />
        </Container.Header>
        <Container.Content>
          <AbilitiesList
            abilities={abilities}
            abilitiesLoading={abilitiesLoading}
            abilitiesError={abilitiesError}
            AbilityCard={AbilityCard}
            baseUrl={abilitiesBaseUrl}
          />
          <Segment loading={this.state.logsLoaded ? false : logsLoading}>
            {logsError ? (
              <ErrorComponent>{logsError.message}</ErrorComponent>
            ) : (
              <LogsListTable>
                <LogsList logs={logs} />
              </LogsListTable>
            )}
          </Segment>
        </Container.Content>
      </Container>
    );
  }
}

DashboardLayout.propTypes = {
  AbilityCard: PropTypes.func,
  abilities: PropTypes.array,
  abilitiesBaseUrl: PropTypes.string,
  abilitiesError: PropTypes.instanceOf(Error),
  abilitiesLoading: PropTypes.bool,
  logs: PropTypes.array,
  logsError: PropTypes.instanceOf(Error),
  logsLoading: PropTypes.bool
};
