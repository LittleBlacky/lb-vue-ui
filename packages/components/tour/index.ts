import Tour from "./src/tour.vue";
import { withInstall } from "@lb-vue-ui/utils";

export const LbTour = withInstall(Tour);

export default LbTour;

export * from "./src/types";

declare module "vue" {
  export interface GlobalComponents {
    LbTour: typeof LbTour;
  }
}
