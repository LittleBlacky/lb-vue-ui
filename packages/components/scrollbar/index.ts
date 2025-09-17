import Scrollbar from "./src/scrollbar.vue";
import { withInstall } from "@lb-vue-ui/utils";

export const LbScrollbar = withInstall(Scrollbar);

export default LbScrollbar;

export * from "./src/types";

declare module "vue" {
  export interface GlobalComponents {
    LbScrollbar: typeof LbScrollbar;
  }
}
