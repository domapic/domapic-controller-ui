import { init } from "./views/HomeMenu";

let config = {
  history: null,
  store: null
};

export const setup = configuration => {
  config = { ...config, ...configuration };
  init(config);
};
