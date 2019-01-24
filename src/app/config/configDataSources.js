import { servicesCollection, servicesModel } from "src/data-sources/services";
import { socket } from "src/socket";

import { config } from "./index";

[servicesCollection, servicesModel].forEach(dataSource =>
  dataSource.config({
    baseUrl: config.baseApi
  })
);

socket.init(config.baseApi);
