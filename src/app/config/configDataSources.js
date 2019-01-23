import { servicesCollection } from "src/data-sources/services";
import { socket } from "src/socket";

import { config } from "./index";

servicesCollection.config({
  baseUrl: config.baseApi
});

socket.init(config.baseApi);