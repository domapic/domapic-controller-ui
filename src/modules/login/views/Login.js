import { plugins } from "reactive-data-source";

import { Component as LoginComponent } from "src/components/login";

import { authJwt } from "src/data-sources/authentication";

/* const doLoginAndAuth = userData => {
  return authJwt.create.dispatch(userData)
    .then(result => {
      console.log("result");
      console.log(result);
    });
} HOW TO DO THIS???*/

export const mapDataSourceToProps = () => {
  // HERE? Adding a listener?
  const doLogin = authJwt.create;
  return {
    dispatch: doLogin.getters.dispatch,
    loading: doLogin.getters.loading,
    error: doLogin.getters.error
  };
};

export const Login = plugins.connect(mapDataSourceToProps)(LoginComponent);
