import React from "react";
import { shallow } from "enzyme";
import { MenuSections, MenuLink } from "./Menu";

describe("Menu Link component", () => {
  it("should render without throwing an error", () => {
    const wrapper = shallow(<MenuLink route={"/"} name={"foo"} />);
    expect(wrapper.exists()).toBe(true);
  });
});

describe("Menu component", () => {
  const sections = [
    {
      name: "foo",
      route: "/foo"
    },
    {
      name: "foo 2",
      route: "/foo2"
    }
  ];

  it("should render without throwing an error", () => {
    const wrapper = shallow(<MenuSections />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should render links sections", () => {
    const wrapper = shallow(<MenuSections sections={sections} />);
    expect(
      wrapper.containsMatchingElement(
        <MenuLink name={sections[0].name} route={sections[0].route} />
      )
    ).toBe(true);
  });

  it("should render as many links as sections are received", () => {
    const wrapper = shallow(<MenuSections sections={sections} />);
    expect(wrapper.find(MenuLink).length).toBe(sections.length);
  });
});
