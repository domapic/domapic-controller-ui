import React from "react";
import { Route } from "react-router";
import { shallow } from "enzyme";

import { SimpleLayoutRouter, SimpleRouter } from "./SimpleLayoutRouter";

import { Login } from "src/components/login/Login";
import { NotFound } from "src/components/not-found/NotFound";

import { routes } from "src/config/routes";

describe("SimpleLayoutRouter", () => {
  it("should render without throwing an error", () => {
    expect(shallow(<SimpleLayoutRouter />).exists()).toBe(true);
  });
});

describe("SimpleRouter", () => {
  it("should render login route", () => {
    const wrapper = shallow(<SimpleRouter />);
    expect(wrapper.containsMatchingElement(<Route path={routes.login} component={Login} />)).toBe(
      true
    );
  });

  it("should render NotFound component if any route match", () => {
    const wrapper = shallow(<SimpleRouter />);
    expect(wrapper.containsMatchingElement(<Route component={NotFound} />)).toBe(true);
  });
});
