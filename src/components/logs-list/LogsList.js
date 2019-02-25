import React from "react";
import PropTypes from "prop-types";

import { Table } from "semantic-ui-react";

import "./logsList.css";

export const NoResults = () => (
  <Table.Row>
    <Table.Cell colSpan="5">No results</Table.Cell>
  </Table.Row>
);

export const Log = ({ module, ability, type, data, dateTime, loading }) => (
  <Table.Row className={loading ? "logs__row--loading" : ""}>
    <Table.Cell>{dateTime}</Table.Cell>
    <Table.Cell>{type}</Table.Cell>
    <Table.Cell>{module}</Table.Cell>
    <Table.Cell>{ability}</Table.Cell>
    <Table.Cell>{data}</Table.Cell>
  </Table.Row>
);

Log.propTypes = {
  ability: PropTypes.string,
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  dateTime: PropTypes.string,
  loading: PropTypes.bool,
  module: PropTypes.string,
  type: PropTypes.string
};

export const LogsList = ({ logs = [], logsLoading, showPlaceHolders }) => {
  const placeHolders = [];
  if (logsLoading && showPlaceHolders) {
    for (let i = 0; i < showPlaceHolders + 1; i++) {
      placeHolders.push(<Log key={i} loading={true} dateTime="..." ability=" " />);
    }
    return <React.Fragment>{placeHolders.map(placeHolder => placeHolder)}</React.Fragment>;
  }
  return (
    <React.Fragment>
      {!showPlaceHolders && logs.length < 1 && !logsLoading ? <NoResults /> : null}
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
    </React.Fragment>
  );
};

LogsList.propTypes = {
  logs: PropTypes.array,
  logsLoading: PropTypes.bool,
  showPlaceHolders: PropTypes.number
};
