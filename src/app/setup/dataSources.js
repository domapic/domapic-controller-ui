import { servicesCollection, servicesModel } from "src/data-sources/services";
import { authJwt } from "src/data-sources/authentication";

import { setBaseUrl, setAllDataSources, setNeedAuthDataSources } from "src/data-sources/setup";
import { socket } from "src/data-sources/socket";
import { login } from "src/data-sources/login";
import { userMe } from "src/data-sources/users";

import { routes } from "../routes";
import { environment } from "../config/environment";

export const allApiDatasources = [servicesCollection, servicesModel, authJwt, userMe];
export const needAuthApiDataSources = [servicesCollection, servicesModel, userMe];

export const setupDataSources = history => {
  setAllDataSources(allApiDatasources);
  setNeedAuthDataSources(needAuthApiDataSources);
  setBaseUrl(environment.baseApi);
  login.setup(history, routes.login.route);
  socket.setup(environment.baseApi);
};
