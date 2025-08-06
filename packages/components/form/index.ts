import Form from "./src/form.vue";
import { withInstall } from "@lb-vue-ui/utils";

export const LbForm = withInstall(Form);

export default LbForm;

export * from "./src/types";

declare module "vue" {
  export interface GlobalComponents {
    LbForm: typeof LbForm;
  }
}
