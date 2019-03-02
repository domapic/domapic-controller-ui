import React from "react";
import PropTypes from "prop-types";

import { Table } from "semantic-ui-react";

import { Component as LogsList } from "src/components/logs-list";

export const LogsListTable = ({ logs = [], logsLoading, children }) => {
  const list = children || <LogsList logs={logs} logsLoading={logsLoading} />;
  return (
    <Table unstackable compact basic size="small">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>At</Table.HeaderCell>
          <Table.HeaderCell>Type</Table.HeaderCell>
          <Table.HeaderCell>Module</Table.HeaderCell>
          <Table.HeaderCell>Ability</Table.HeaderCell>
          <Table.HeaderCell>Data</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>{list}</Table.Body>
    </Table>
  );
};

LogsListTable.propTypes = {
  children: PropTypes.node,
  logs: PropTypes.array,
  logsLoading: PropTypes.bool
};
