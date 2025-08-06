import Icon from "./src/icon.vue";
import { withInstall } from "@lb-vue-ui/utils";

export const LbIcon = withInstall(Icon);

export default LbIcon;

export * from "./src/types";

declare module "vue" {
  export interface GlobalComponents {
    LbIcon: typeof Icon;
  }
}
