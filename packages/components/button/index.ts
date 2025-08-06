import Button from "./src/button.vue";
import { withInstall } from "@lb-vue-ui/utils";

export const LbButton = withInstall(Button);

export default LbButton;

export * from "./src/types";

declare module "vue" {
  export interface GlobalComponents {
    LbButton: typeof LbButton;
  }
}
