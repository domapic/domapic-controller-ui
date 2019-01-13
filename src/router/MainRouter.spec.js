import React from "react";
import { shallow } from "enzyme";
import { MainRouter } from "./MainRouter";

describe("MainRouter", () => {
  it("should render without throwing an error", () => {
    expect(shallow(<MainRouter />).exists()).toBe(true);
  });
});
