import { setup } from "./setup";
import { Component as LoginComponent } from "./components/login";
import { Login } from "./views/Login";

export const Module = Login;

Module.setup = setup;
Module.constants = {
  types: LoginComponent.types
};
