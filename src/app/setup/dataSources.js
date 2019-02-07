import { servicesCollection, servicesModel } from "src/data-sources/services";
import { abilitiesCollection } from "src/data-sources/abilities";
import { about } from "src/data-sources/about";
import { config } from "src/data-sources/config";
import { logs } from "src/data-sources/logs";
import { authJwt } from "src/data-sources/authentication";
import { login } from "src/data-sources/login";
import { userMe, usersCollection } from "src/data-sources/users";

import { setBaseUrl, setAllDataSources, setNeedAuthDataSources } from "src/data-sources/setup";
import { socket } from "src/data-sources/socket";

import { routes } from "../routes";
import { environment } from "../config/environment";

export const allApiDatasources = [
  servicesCollection,
  servicesModel,
  authJwt,
  userMe,
  abilitiesCollection,
  about,
  config,
  logs,
  usersCollection
];
export const needAuthApiDataSources = [
  servicesCollection,
  servicesModel,
  userMe,
  abilitiesCollection,
  config,
  logs,
  usersCollection
];

export const setupDataSources = history => {
  setAllDataSources(allApiDatasources);
  setNeedAuthDataSources(needAuthApiDataSources);
  setBaseUrl(environment.baseApi);
  login.setup(history, routes.login.route);
  socket.setup(environment.baseApi);
};
