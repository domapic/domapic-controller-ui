import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export class Modules extends Component {
  render() {
    const modules = this.props.modules.value || [];
    const modulesLoading = this.props.modules.loading;
    const modulesError = this.props.modules.error;

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
              <Link to={`${this.props.baseUrl}/${module._id}`}>{module.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

Modules.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  modules: PropTypes.any.isRequired
};
