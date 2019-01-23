import React from "react";
import { shallow } from "enzyme";
import { SimpleLayout } from "./SimpleLayout";

describe("SimpleLayout component", () => {
  it("should render without throwing an error", () => {
    const wrapper = shallow(<SimpleLayout />);
    expect(wrapper.exists()).toBe(true);
  });
});
