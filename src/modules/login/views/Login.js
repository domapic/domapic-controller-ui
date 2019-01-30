import { plugins } from "reactive-data-source";

import { Component as LoginComponent } from "src/components/login";

import { authSession, authJwt } from "src/data-sources/authentication";

const doLoginAndAuth = userData =>
  authJwt.create(userData).then(result => {
    authSession.refreshToken().update(result.refreshToken);
  });

export const mapDataSourceToProps = () => {
  const doLogin = authJwt.create;
  return {
    doLoginAndAuth,
    loading: doLogin.getters.loading,
    error: doLogin.getters.error
  };
};

export const Login = plugins.connect(mapDataSourceToProps)(LoginComponent);
