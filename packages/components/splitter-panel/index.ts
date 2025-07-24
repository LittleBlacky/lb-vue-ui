import SplitterPanel from "./src/splitter-panel.vue";
import { withInstall } from "@lb-vue-ui/utils/install";

export const LbSplitterPanel = withInstall(SplitterPanel);

export default LbSplitterPanel;

export * from "./src/types";

declare module "vue" {
  export interface GlobalComponents {
    LbSplitterPanel: typeof LbSplitterPanel;
  }
}
