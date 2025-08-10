import RadioGroup from "./src/radio-group.vue";
import { withInstall } from "@lb-vue-ui/utils";

export const LbRadioGroup = withInstall(RadioGroup);

export default LbRadioGroup;

export * from "./src/types";

declare module "vue" {
  export interface GlobalComponents {
    LbRadioGroup: typeof LbRadioGroup;
  }
}
