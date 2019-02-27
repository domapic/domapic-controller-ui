import React, { Component } from "react";
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

export class LogsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: props.logs.length > 0
    };
    if (this.state.loaded && props.onLoaded) {
      props.onLoaded();
    }
  }

  componentDidUpdate() {
    if (!this.state.loaded && this.props.logsLoading === false && this.props.onLoaded) {
      this.setState({
        loaded: true
      });
      this.props.onLoaded();
    }
  }

  render() {
    const placeHolders = [];
    const { logs = [], logsLoading, showPlaceHolders, showNoResults } = this.props;
    if (logs.length < 1 && logsLoading && showPlaceHolders) {
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
  }
}

LogsList.propTypes = {
  logs: PropTypes.array,
  logsLoading: PropTypes.bool,
  onLoaded: PropTypes.func,
  showNoResults: PropTypes.bool,
  showPlaceHolders: PropTypes.number
};
