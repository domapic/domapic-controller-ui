import React from "react";
import { shallow } from "enzyme";
import { Main as Dashboard } from "./Main";

describe("Dashboard component", () => {
  it("should render without throwing an error", () => {
    const wrapper = shallow(<Dashboard />);
    expect(wrapper.exists()).toBe(true);
  });
});
