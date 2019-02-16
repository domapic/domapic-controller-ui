import React from "react";
import PropTypes from "prop-types";

import { Table } from "semantic-ui-react";

export const Log = ({ module, ability, type, data, dateTime }) => (
  <Table.Row>
    <Table.Cell>{dateTime}</Table.Cell>
    <Table.Cell>{type}</Table.Cell>
    <Table.Cell>{module}</Table.Cell>
    <Table.Cell>{ability}</Table.Cell>
    <Table.Cell>{data}</Table.Cell>
  </Table.Row>
);

Log.propTypes = {
  ability: PropTypes.string.isRequired,
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  dateTime: PropTypes.string.isRequired,
  module: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export const LogsList = ({ logs = [] }) => (
  <Table unstackable compact="very">
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>At</Table.HeaderCell>
        <Table.HeaderCell>Type</Table.HeaderCell>
        <Table.HeaderCell>Module</Table.HeaderCell>
        <Table.HeaderCell>Ability</Table.HeaderCell>
        <Table.HeaderCell>Data</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {logs.map(log => (
        <Log
          key={log._id}
          module={log.module}
          ability={log.ability}
          type={log.type}
          data={log.data}
          dateTime={log.dateTime}
        />
      ))}
    </Table.Body>
  </Table>
);

LogsList.propTypes = {
  logs: PropTypes.array
};
