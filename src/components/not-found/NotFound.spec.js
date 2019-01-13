import React from "react";
import { shallow } from "enzyme";
import { NotFound } from "./NotFound";

describe("NotFound component", () => {
  it("should render without throwing an error", () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper.exists()).toBe(true);
  });
});
