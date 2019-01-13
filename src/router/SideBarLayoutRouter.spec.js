import React from "react";
import { shallow } from "enzyme";
import { Route } from "react-router";

import { SideBarLayoutRouter, SideBarRouter } from "./SideBarLayoutRouter";

import { sectionsAsArray } from "src/config/sections";

describe("SideBarLayoutRouter", () => {
  it("should render without throwing an error", () => {
    expect(shallow(<SideBarLayoutRouter />).exists()).toBe(true);
  });
});

describe("SideBarRouter", () => {
  it("should render routes from sections", () => {
    const wrapper = shallow(<SideBarRouter />);
    expect(
      wrapper.containsMatchingElement(
        <Route path={sectionsAsArray[0].route} component={sectionsAsArray[0].component} />
      )
    ).toBe(true);
  });

  it("should render as many routes as sections are in configuration", () => {
    const wrapper = shallow(<SideBarRouter />);
    expect(wrapper.find(Route).length).toBe(sectionsAsArray.length);
  });
});
