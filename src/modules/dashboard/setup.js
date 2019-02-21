import { init } from "./views/Main";

let config = {
  abilitiesBaseUrl: ""
};

export const setup = configuration => {
  config = { ...config, ...configuration };
  init(config);
};
