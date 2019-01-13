import React from "react";
import { shallow } from "enzyme";
import { Header } from "./Header";

describe("Header component", () => {
  it("should render without throwing an error", () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.exists()).toBe(true);
  });
});
