import React, { Component } from "react";
import PropTypes from "prop-types";

import { match } from "src/helpers/propTypes";

export class Module extends Component {
  render() {
    const id = this.props.id || this.props.match.params.id;
    return (
      <div>
        <h2> Module </h2>
        <p>Id: {id}</p>
      </div>
    );
  }
}

Module.propTypes = {
  id: PropTypes.string,
  match
};
