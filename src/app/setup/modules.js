import { Module as LoginModule } from "src/modules/login";

LoginModule.setup({
  type: LoginModule.types.JWT,
  allowChangeType: true,
  header: "Domapic Controller"
});
