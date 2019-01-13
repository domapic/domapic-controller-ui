import { multiRoutesMatcher, sectionsRoutes } from "./routes";

describe("routes helpers", () => {
  describe("multiRoutesMatcher", () => {
    it("should return a route regex", () => {
      expect(multiRoutesMatcher(["foo", "foo2"])).toEqual("(foo|foo2)");
    });
  });

  describe("sectionsRoutes", () => {
    it("should return an array containing the route property of each section", () => {
      expect(
        sectionsRoutes({
          foo: {
            route: "/foo"
          },
          foo2: {
            route: "/foo2"
          }
        })
      ).toEqual(["/foo", "/foo2"]);
    });
  });
});
