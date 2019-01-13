import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import PropTypes from "prop-types";

import { Module } from "src/components/module/Module";

import { modules } from "src/data-sources/services";
import { connect } from "src/data-sources/bases";

import { match } from "src/helpers/propTypes";

export class Modules extends Component {
  render() {
    const modules = this.props.modules.value || [];
    const modulesLoading = this.props.modules.loading;
    const modulesError = this.props.modules.error;
    const baseRoute = this.props.match || {};

    if (modulesError) {
      return <div>ERROR</div>;
    }

    if (modulesLoading) {
      return <div>LOADING...</div>;
    }

    return (
      <div>
        <h2>Modules</h2>
        <ul>
          {modules.map(module => (
            <li key={module._id}>
              <Link to={`${baseRoute.url}/${module._id}`}>{module.name}</Link>
            </li>
          ))}
        </ul>
        <Route path={`${baseRoute.path}/:id`} component={Module} />
      </div>
    );
  }
}

Modules.propTypes = {
  match,
  modules: PropTypes.shape({
    value: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      })
    ),
    error: PropTypes.instanceOf(Error),
    loading: PropTypes.bool.isRequired
  }).isRequired
};

export const mapDataSourceToProps = () => ({
  modules
});

export const ConnectedModules = connect(mapDataSourceToProps)(Modules);
