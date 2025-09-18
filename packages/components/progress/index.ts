import Progress from "./src/progress.vue";
import { withInstall } from "@lb-vue-ui/utils";

export const LbProgress = withInstall(Progress);

export default LbProgress;

export * from "./src/types";

declare module "vue" {
  export interface GlobalComponents {
    LbProgress: typeof LbProgress;
  }
}
