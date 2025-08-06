import Splitter from "./src/splitter.vue";
import { withInstall } from "@lb-vue-ui/utils";

export const LbSplitter = withInstall(Splitter);

export default LbSplitter;

export * from "./src/types";

declare module "vue" {
  export interface GlobalComponents {
    LbSplitter: typeof LbSplitter;
  }
}
