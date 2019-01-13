import React from "react";
import { shallow } from "enzyme";
import { Module } from "./Module";

describe("Module component", () => {
  it("should throw an error when no id is defined", () => {
    expect(() => shallow(<Module />)).toThrow();
  });

  it("should render without throwing an error", () => {
    const wrapper = shallow(<Module id={"foo-id"} />);
    expect(wrapper.exists()).toBe(true);
  });
});
