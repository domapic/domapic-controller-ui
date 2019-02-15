import { login } from "src/data-layer/login";
import { config } from "src/data-layer/setup";
import { socket } from "src/data-layer/socket";

import { routes } from "../routes";
import { environment } from "../config/environment";

export const setupDataSources = history => {
  login.setup(history, routes.login.route);
  config({
    baseUrl: environment.baseApi
  });
  socket.setup(environment.baseApi);
};
