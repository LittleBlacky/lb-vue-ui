import Checkbox from "./src/checkbox.vue";
import { withInstall } from "@lb-vue-ui/utils";

export const LbCheckbox = withInstall(Checkbox);

export default LbCheckbox;

export * from "./src/types";

declare module "vue" {
  export interface GlobalComponents {
    LbCheckbox: typeof LbCheckbox;
  }
}
