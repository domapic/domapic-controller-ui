import { servicesCollection, servicesModel } from "src/data-sources/services";
import { authJwt } from "src/data-sources/authentication";

import { setup } from "src/data-sources/setup";
import { socket } from "src/data-sources/socket";
import { login } from "src/data-sources/login";

import { routes } from "../routes";
import { environment } from "../config/environment";

const allApiDatasources = [servicesCollection, servicesModel, authJwt];
const needAuthApiDataSources = [servicesCollection, servicesModel];

export const setupDataSources = history => {
  setup(allApiDatasources, {
    baseApi: environment.baseApi
  });
  login.setup(needAuthApiDataSources, history, routes.login.route);
  socket.setup(environment.baseApi);
};
