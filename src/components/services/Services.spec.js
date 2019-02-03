import React from "react";
import { shallow } from "enzyme";

import { Services } from "./Services";

describe("Services component", () => {
  it("should render without throwing an error", () => {
    const wrapper = shallow(<Services modules={[]} error={null} loading={false} />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should render without throwing an error when modules are loading", () => {
    const wrapper = shallow(<Services modules={[]} error={null} loading={true} />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should render without throwing an error when modules have an error", () => {
    const wrapper = shallow(<Services modules={[]} error={new Error()} loading={false} />);
    expect(wrapper.exists()).toBe(true);
  });
});
