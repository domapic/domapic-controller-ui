import React from "react";
import { shallow } from "enzyme";

import { Modules } from "./Modules";

describe("Modules component", () => {
  it("should render without throwing an error", () => {
    const wrapper = shallow(<Modules modules={[]} error={null} loading={false} />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should render without throwing an error when modules are loading", () => {
    const wrapper = shallow(<Modules modules={[]} error={null} loading={true} />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should render without throwing an error when modules have an error", () => {
    const wrapper = shallow(<Modules modules={[]} error={new Error()} loading={false} />);
    expect(wrapper.exists()).toBe(true);
  });
});
