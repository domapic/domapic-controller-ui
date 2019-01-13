import React from "react";
import { Link } from "react-router-dom";
import { shallow } from "enzyme";

import { modules } from "src/data-sources/services";
import { Modules, mapDataSourceToProps } from "./Modules";

describe("Modules component", () => {
  const modulesMock = [
    {
      _id: "foo-id-1",
      name: "foo-name"
    },
    {
      _id: "foo-id-2",
      name: "foo-name-2"
    }
  ];

  it("should render without throwing an error", () => {
    const wrapper = shallow(
      <Modules
        modules={{
          value: [],
          error: null,
          loading: false
        }}
      />
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should render without throwing an error when modules are loading", () => {
    const wrapper = shallow(
      <Modules
        modules={{
          value: [],
          error: null,
          loading: true
        }}
      />
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should render without throwing an error when modules have an error", () => {
    const wrapper = shallow(
      <Modules
        modules={{
          value: null,
          error: new Error(),
          loading: false
        }}
      />
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should render links to modules", () => {
    const wrapper = shallow(
      <Modules
        modules={{
          value: modulesMock,
          error: null,
          loading: false
        }}
        match={{
          url: ""
        }}
      />
    );
    expect(wrapper.containsMatchingElement(<Link to={"/foo-id-1"}>foo-name</Link>)).toBe(true);
  });

  it("should render as many links as modules are", () => {
    const wrapper = shallow(
      <Modules
        modules={{
          value: modulesMock,
          error: null,
          loading: false
        }}
      />
    );
    expect(wrapper.find(Link).length).toBe(modulesMock.length);
  });

  it("should be connected to modules data source", () => {
    expect(mapDataSourceToProps()).toEqual({
      modules
    });
  });
});
