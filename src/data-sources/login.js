import queryString from "query-string";

import { authSession, authJwt } from "./authentication";
import { setAuthErrorHandler, setJwt, setApiKey } from "./setup";

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
              setJwt(response.accessToken);
              return retry();
            });
        } else if (apiKey) {
          setApiKey(apiKey);
          return retry();
        }
        return Promise.reject(new Error("No authentication token found"));
      })
      .catch(err => {
        return Promise.all([this._refreshToken.delete(), this._apiKey.delete()]).then(() => {
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
    setAuthErrorHandler(this._doLogin);
  }

  setup(history, loginRoute) {
    this._history = history;
    this._loginRoute = loginRoute;
    this._configDataSources();
  }
}

export const login = new Login();
