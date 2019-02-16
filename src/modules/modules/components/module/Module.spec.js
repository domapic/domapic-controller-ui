import React from "react";
import { shallow } from "enzyme";
import { Module } from "./Module";

describe("Module component", () => {
  it("should render without throwing an error", () => {
    const wrapper = shallow(<Module />);
    expect(wrapper.exists()).toBe(true);
  });
});
