import CheckboxGroup from "./src/checkbox-group.vue";
import { withInstall } from "@lb-vue-ui/utils";

export const LbCheckboxGroup = withInstall(CheckboxGroup);

export default LbCheckboxGroup;

export * from "./src/types";

declare module "vue" {
  export interface GlobalComponents {
    LbCheckboxGroup: typeof LbCheckboxGroup;
  }
}
