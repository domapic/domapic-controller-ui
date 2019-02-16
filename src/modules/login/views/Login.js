import { plugins } from "reactive-data-source";

import { Component as LoginComponent } from "../components/login";

import { authSession, authJwt } from "src/data-layer/authentication";
import { setApiKeyAuth, setJwtAuth } from "src/data-layer/setup";

let moduleConfig = {
  type: LoginComponent.types.JWT,
  allowChangeType: false,
  header: "Domapic"
};

const setup = config => {
  moduleConfig = { ...moduleConfig, ...config };
};

const doJwtLogin = userData =>
  Promise.all([
    authJwt
      .create(userData)
      .then(result =>
        Promise.all([
          authSession.refreshToken().update(result.refreshToken),
          setJwtAuth(result.accessToken)
        ])
      ),
    authSession.apiKey().delete()
  ]);

const doApiKeyLogin = apiKey =>
  Promise.all([
    authSession.apiKey().update(apiKey),
    setApiKeyAuth(apiKey),
    authSession.refreshToken().delete()
  ]);

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
Login.types = LoginComponent.types;
