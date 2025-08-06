import Tooltip from "./src/tooltip.vue";
import { withInstall } from "@lb-vue-ui/utils";

export const LbTooltip = withInstall(Tooltip);

export default LbTooltip;

export * from "./src/types";

declare module "vue" {
  export interface GlobalComponents {
    LbTooltip: typeof LbTooltip;
  }
}
