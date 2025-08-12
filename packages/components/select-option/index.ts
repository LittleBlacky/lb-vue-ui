import SelectOption from "./src/select-option.vue";
import { withInstall } from "@lb-vue-ui/utils";

export const LbSelectOption = withInstall(SelectOption);

export default LbSelectOption;

export * from "./src/types";

declare module "vue" {
  export interface GlobalComponents {
    LbSelectOption: typeof LbSelectOption;
  }
}
