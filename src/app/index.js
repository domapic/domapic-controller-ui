import React, { Component } from "react";
import createHistory from "history/createBrowserHistory";

import { RoutesContext } from "src/context/RoutesContext";
import { HistoryContext } from "src/context/HistoryContext";

import { config } from "./config";
import { routes, sections } from "./routes";
import { MainRouter } from "./routers/Main";

import "./config/configDataSources";

import "semantic-ui-css/semantic.min.css";
import "./app.css";

const routesContext = {
  assets: `${config.staticsRoute}assets`,
  home: routes.index.route,
  configuration: sections.configuration.route,
  users: sections.users.route,
  account: sections.account.route,
  packageInfo: routes.packageInfo.route,
  swagger: routes.swagger.route
};

const history = createHistory({
  basename: routes.index.route
});

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      history: {
        history,
        position: 0
      }
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
          history: {
            history,
            position: state.history.position - 1
          }
        }));
        break;
      case "PUSH":
        this.setState(state => ({
          history: {
            history,
            position: state.history.position + 1
          }
        }));
        break;
    }
  }

  render() {
    return (
      <div className="app">
        <RoutesContext.Provider value={routesContext}>
          <HistoryContext.Provider value={this.state.history}>
            <MainRouter history={history} />
          </HistoryContext.Provider>
        </RoutesContext.Provider>
      </div>
    );
  }
}
