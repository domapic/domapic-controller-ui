import React from "react";
import ReactDOM from "react-dom";
import { hot } from "react-hot-loader";

import { MainRouter } from "src/router/MainRouter.js";

const HotApp = hot(module)(MainRouter);

ReactDOM.render(<HotApp />, document.getElementById("root"));
