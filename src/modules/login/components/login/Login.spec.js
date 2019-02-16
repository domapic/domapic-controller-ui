import React from "react";
import { shallow } from "enzyme";
import { Login } from "./Login";

describe("Login component", () => {
  it("should render without throwing an error", () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.exists()).toBe(true);
  });
});
