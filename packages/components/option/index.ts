import Option from "./src/option.vue";
import { withInstall } from "@lb-vue-ui/utils";

export const LbOption = withInstall(Option);

export default LbOption;

export * from "./src/types";

declare module "vue" {
  export interface GlobalComponents {
    LbOption: typeof LbOption;
  }
}
