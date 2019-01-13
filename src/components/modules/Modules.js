import React, { Component } from "react";
import { Link, Route } from "react-router-dom";

import { Module } from "src/components/module/Module";

import { match } from "src/helpers/propTypes";

export class Modules extends Component {
  render() {
    const baseRoute = this.props.match || {};
    return (
      <div>
        <h2>Modules</h2>
        <Link to={`${baseRoute.url}/2`}>Module 2</Link>
        <Link to={`${baseRoute.url}/3`}>Module 3</Link>
        <Route path={`${baseRoute.path}/:id`} component={Module} />
      </div>
    );
  }
}

Modules.propTypes = {
  match
};
