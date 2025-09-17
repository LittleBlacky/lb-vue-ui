import TourStep from "./src/tour-step.vue";
import { withInstall } from "@lb-vue-ui/utils";

export const LbTourStep = withInstall(TourStep);

export default LbTourStep;

export * from "./src/types";

declare module "vue" {
  export interface GlobalComponents {
    LbTourStep: typeof LbTourStep;
  }
}
