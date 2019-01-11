import React, { Component } from "react";

import { config } from "src/config";
import "./app.css";

export class App extends Component {
  render() {
    return (
      <div className="app">
        <h1> Hello, World! {config.version}</h1>
      </div>
    );
  }
}
