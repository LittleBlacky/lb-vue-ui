import Skeleton from "./src/skeleton.vue";
import { withInstall } from "@lb-vue-ui/utils";

export const LbSkeleton = withInstall(Skeleton);

export default LbSkeleton;

export * from "./src/types";

declare module "vue" {
  export interface GlobalComponents {
    LbSkeleton: typeof LbSkeleton;
  }
}
