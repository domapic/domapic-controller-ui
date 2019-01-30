import { Module as LoginModule } from "src/modules/login";

LoginModule.setup({
  type: "jwt",
  allowChangeType: true
});
