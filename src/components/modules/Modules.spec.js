import React from "react";
import { shallow } from "enzyme";
import { Modules } from "./Modules";

describe("Modules component", () => {
  it("should render without throwing an error", () => {
    const wrapper = shallow(<Modules />);
    expect(wrapper.exists()).toBe(true);
  });
});
