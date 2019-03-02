import React from "react";
import PropTypes from "prop-types";

import { Table } from "semantic-ui-react";
import { Component as ErrorComponent } from "src/components/error";

import "./logsList.css";

export const NoResults = () => (
  <Table.Row>
    <Table.Cell colSpan="5">No results</Table.Cell>
  </Table.Row>
);

export const ResultsError = ({ message }) => (
  <Table.Row>
    <Table.Cell colSpan="5">
      <ErrorComponent>{message}</ErrorComponent>
    </Table.Cell>
  </Table.Row>
);

ResultsError.propTypes = {
  message: PropTypes.string
};

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

export const LogsList = ({
  logs = [],
  logsLoading,
  logsError,
  logsLoaded,
  showPlaceHolders,
  showNoResults,
  showError
}) => {
  const placeHolders = [];
  if (logsError) {
    return showError ? <ResultsError message={logsError.message} /> : null;
  }
  if (!logsLoaded && logsLoading && showPlaceHolders) {
    for (let i = 0; i < showPlaceHolders + 1; i++) {
      placeHolders.push(<Log key={i} loading={true} dateTime="..." ability=" " />);
    }
    return <React.Fragment>{placeHolders.map(placeHolder => placeHolder)}</React.Fragment>;
  }
  return (
    <React.Fragment>
      {showNoResults && logs.length < 1 && !logsLoading ? <NoResults /> : null}
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
  logsError: PropTypes.instanceOf(Error),
  logsLoaded: PropTypes.bool,
  logsLoading: PropTypes.bool,
  showError: PropTypes.bool,
  showNoResults: PropTypes.bool,
  showPlaceHolders: PropTypes.number
};
