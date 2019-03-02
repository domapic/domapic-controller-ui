import { init } from "./Layouts";

let config = {
  abilitiesBaseUrl: ""
};

export const setup = configuration => {
  config = { ...config, ...configuration };
  init(config);
};
