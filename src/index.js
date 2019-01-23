import React from "react";
import ReactDOM from "react-dom";
import { hot } from "react-hot-loader";

import { App } from "src/app";

const HotApp = hot(module)(App);

ReactDOM.render(<HotApp />, document.getElementById("root"));
