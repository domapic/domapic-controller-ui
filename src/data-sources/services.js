import { Selector } from "./bases";
import { Api } from "./bases/Api";

import { config } from "src/config";

export const services = new Api(`${config.baseApi}/services`);

export const modules = new Selector(
  {
    source: services,
    filter: () => ({
      query: {
        type: "module"
      }
    })
  },
  modules => modules
);
