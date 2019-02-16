import { init } from "./views/Login";
import { Component as LoginComponent } from "./components/login";

let config = {
  type: LoginComponent.types.JWT,
  allowChangeType: false,
  header: "Domapic"
};

export const setup = configuration => {
  config = { ...config, ...configuration };
  init(config);
};
