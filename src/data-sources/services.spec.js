import * as sinon from "sinon";
import axios from "axios";

jest.mock("axios");

import { modules } from "./services";

describe("Services Data Source", () => {
  let axiosSpy;
  beforeEach(() => {
    axiosSpy = sinon.stub().resolves({
      response: {}
    });
    axios.mockImplementation(axiosSpy);
  });

  describe("modules selector", () => {
    it("should request services adding type filter", async () => {
      await modules.read();
      expect(axiosSpy.getCall(0).args[0].url).toContain("type=module");
    });
  });
});
