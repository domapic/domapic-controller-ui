import React from "react";
import { shallow } from "enzyme";
import { App } from "./App";

describe("App component", () => {
  it("should render without throwing an error", () => {
    const appWrapper = shallow(<App />);
    expect(appWrapper.exists()).toBe(true);
  });
});
