import React from "react";
import { shallow } from "enzyme";
import { SideBarLayout } from "./SideBarLayout";

describe("SideBarLayout component", () => {
  it("should render without throwing an error", () => {
    const wrapper = shallow(<SideBarLayout />);
    expect(wrapper.exists()).toBe(true);
  });
});
