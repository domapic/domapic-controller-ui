"use strict";

import queryString from "query-string";

import { authSession, authJwt } from "./authentication";
import { config, removeAuth, setJwtAuth, setApiKeyAuth, cleanAll } from "./setup";

class Login {
  constructor() {
    this._doLogin = this._doLogin.bind(this);
    this._refreshToken = authSession.refreshToken();
    this._apiKey = authSession.apiKey();
    this._loginPromise = null;
  }

  _doLogin(dataSources, retry) {
    const noAuthenticationTokenError = new Error("No authentication token found");
    return Promise.all([this._refreshToken.read(), this._apiKey.read()])
      .then(tokens => {
        const refreshToken = tokens[0];
        const apiKey = tokens[1];
        if (refreshToken) {
          this._loginPromise =
            this._loginPromise ||
            authJwt.create({
              refreshToken
            });
          return this._loginPromise.then(response => {
            setJwtAuth(response.accessToken);
            return retry();
          });
        } else if (apiKey) {
          setApiKeyAuth(apiKey);
          return retry();
        }
        return Promise.reject(noAuthenticationTokenError);
      })
      .then(results => {
        this._loginPromise = null;
        return Promise.resolve(results);
      })
      .catch(error => {
        this._loginPromise = null;
        if (error === noAuthenticationTokenError || error.message === "Unauthorized") {
          return this.logout().then(() => Promise.reject(error));
        } else {
          return Promise.reject(error);
        }
      });
  }

  _configDataSources() {
    config({
      authErrorHandler: this._doLogin
    });
  }

  logout() {
    return Promise.all([this._refreshToken.delete(), this._apiKey.delete()]).then(() => {
      const previousLocation =
        this._history.location.pathname !== this._loginRoute
          ? `?${queryString.stringify({
              redirect: this._history.location.pathname
            })}`
          : "";
      this._history.push(`${this._loginRoute}${previousLocation}`);
      removeAuth();
      cleanAll();
      return Promise.resolve();
    });
  }

  setup(history, loginRoute) {
    this._history = history;
    this._loginRoute = loginRoute;
    this._configDataSources();
  }
}

export const login = new Login();
