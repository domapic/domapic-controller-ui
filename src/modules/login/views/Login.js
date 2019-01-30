import { plugins } from "reactive-data-source";

import { Component as LoginComponent } from "src/components/login";

import { authSession, authJwt } from "src/data-sources/authentication";

let moduleConfig = {
  type: "jwt",
  allowChangeType: false
};

const setup = config => {
  moduleConfig = config;
};

const doJwtLogin = userData =>
  Promise.all([
    authJwt.create(userData).then(result => {
      authSession.refreshToken().update(result.refreshToken);
    }),
    authSession.apiKey().delete()
  ]);

const doApiKeyLogin = apiKey =>
  Promise.all([authSession.apiKey().update(apiKey), authSession.refreshToken().delete()]);

export const mapDataSourceToProps = () => {
  const doLogin = authJwt.create;
  return {
    doApiKeyLogin,
    doJwtLogin,
    jwtLoading: doLogin.getters.loading,
    jwtError: doLogin.getters.error,
    ...moduleConfig
  };
};

export const Login = plugins.connect(mapDataSourceToProps)(LoginComponent);

Login.setup = setup;
