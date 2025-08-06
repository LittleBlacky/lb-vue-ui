import SplitterBar from "./src/splitter-bar.vue";
import { withInstall } from "@lb-vue-ui/utils";

export const LbSplitterBar = withInstall(SplitterBar);

export default LbSplitterBar;

export * from "./src/types";

declare module "vue" {
  export interface GlobalComponents {
    LbSplitterBar: typeof LbSplitterBar;
  }
}
