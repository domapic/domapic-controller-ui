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
    const noAuthenticationTokenError = new Error("No authentication token found");
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
        return Promise.reject(noAuthenticationTokenError);
      })
      .catch(error => {
        if (error === noAuthenticationTokenError || error.message === "Unauthorized") {
          return Promise.all([this._refreshToken.delete(), this._apiKey.delete()]).then(() => {
            const previousLocation =
              this._history.location.pathname !== this._loginRoute
                ? `?${queryString.stringify({
                    redirect: this._history.location.pathname
                  })}`
                : "";
            this._history.push(`${this._loginRoute}${previousLocation}`);
            return Promise.reject(error);
          });
        } else {
          return Promise.reject(error);
        }
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
