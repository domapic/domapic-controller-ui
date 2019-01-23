import { servicesCollection } from "src/data-sources/services";

import { config } from "./index";

servicesCollection.config({
  baseUrl: config.baseApi
});
