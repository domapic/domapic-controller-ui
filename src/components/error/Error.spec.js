import React from "react";
import { shallow } from "enzyme";
import { ErrorComponent } from "./Error";

describe("ErrorComponent component", () => {
  it("should render without throwing an error", () => {
    const wrapper = shallow(<ErrorComponent />);
    expect(wrapper.exists()).toBe(true);
  });
});
