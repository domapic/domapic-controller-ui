import React, { Component } from "react";
import createHistory from "history/createBrowserHistory";

import { RoutesContext } from "src/context/RoutesContext";
import { HistoryContext } from "src/context/HistoryContext";

import { config } from "./config";
import { routes } from "./routes";
import { MainRouter } from "./routers/Main";

import "./config/configDataSources";
import "semantic-ui-css/semantic.min.css";
import "./app.css";

const routesContext = {
  assets: `${config.staticsRoute}assets`,
  home: routes.index.route
};

const history = createHistory({
  basename: routes.index.route
});

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      historyPosition: 0
    };

    this.changeHistoryPosition = this.changeHistoryPosition.bind(this);
  }

  componentDidMount() {
    this.unlistenHistory = history.listen(this.changeHistoryPosition);
  }

  componentWillUnmount() {
    this.unlistenHistory();
  }

  changeHistoryPosition(location, action) {
    switch (action) {
      case "POP":
        this.setState(state => ({
          historyPosition: state.historyPosition - 1
        }));
        break;
      case "PUSH":
        this.setState(state => ({
          historyPosition: state.historyPosition + 1
        }));
        break;
    }
  }

  render() {
    return (
      <div className="app">
        <RoutesContext.Provider value={routesContext}>
          <HistoryContext.Provider
            value={{
              history,
              position: this.state.historyPosition
            }}
          >
            <MainRouter history={history} />
          </HistoryContext.Provider>
        </RoutesContext.Provider>
      </div>
    );
  }
}
