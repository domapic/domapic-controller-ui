import React from "react";
import PropTypes from "prop-types";

import { Component as LogsList } from "src/components/logs-list";
import { Component as Container } from "src/components/container-content";
import { Component as Breadcrumbs } from "src/components/breadcrumbs";

export const Activity = ({ loading, error, logs = [] }) => {
  return (
    <Container loading={loading} error={error} background={true}>
      <Container.Header>
        <Breadcrumbs sections={[{ text: "Activity", icon: "history" }]} />
      </Container.Header>
      <Container.Content>
        <LogsList logs={logs} />
      </Container.Content>
    </Container>
  );
};

Activity.propTypes = {
  error: PropTypes.instanceOf(Error),
  loading: PropTypes.bool.isRequired,
  logs: PropTypes.array
};
