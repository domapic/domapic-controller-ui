import queryString from "query-string";

import { authSession, authJwt } from "./authentication";

class Login {
  constructor() {
    this._doLogin = this._doLogin.bind(this);
    this._refreshToken = authSession.refreshToken();
    this._apiKey = authSession.apiKey();
  }

  _doLogin(dataSources, retry) {
    return Promise.all([this._refreshToken.read(), this._apiKey.read()])
      .then(tokens => {
        const refreshToken = tokens[0];
        const apiKey = tokens[1];
        if (refreshToken) {
          return authJwt
            .create({
              refreshToken
            })
            .then(response => {
              this._dataSources.forEach(dataSource => {
                dataSource.addHeaders({
                  authorization: `Bearer ${response.accessToken}`
                });
              });
              return retry();
            });
        } else if (apiKey) {
          this._dataSources.forEach(dataSource => {
            dataSource.addHeaders({
              "X-Api-Key": apiKey
            });
          });
          return retry();
        }
        return Promise.reject(new Error("No authentication token found"));
      })
      .catch(err => {
        return this._refreshToken.delete().then(() => {
          this._history.push(
            `${this._loginRoute}?${queryString.stringify({
              redirect: this._history.location.pathname
            })}`
          );
          return Promise.reject(err);
        });
      });
  }

  _configDataSources() {
    this._dataSources.forEach(dataSource =>
      dataSource.config({
        authErrorHandler: this._doLogin
      })
    );
  }

  setup(dataSources, history, loginRoute) {
    this._history = history;
    this._loginRoute = loginRoute;
    this._dataSources = dataSources;
    this._configDataSources();
  }
}

export const login = new Login();
