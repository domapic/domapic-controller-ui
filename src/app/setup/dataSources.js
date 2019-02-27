import { login } from "src/data-layer/login";
import { config } from "src/data-layer/setup";
import { socket } from "src/data-layer/socket";

import { routes } from "../routes";
import { environment } from "../config/environment";

export const setupDataSources = history => {
  config({
    baseUrl: environment.baseApi
  });

  login.setup(history, routes.login.route);
  socket.setup(environment.baseSocket);
};
