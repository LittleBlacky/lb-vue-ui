import SkeletonItem from "./src/skeleton-item.vue";
import { withInstall } from "@lb-vue-ui/utils/install";

export const LbSkeletonItem = withInstall(SkeletonItem);

export default LbSkeletonItem;

export * from "./src/types";

declare module "vue" {
  export interface GlobalComponents {
    LbSkeletonItem: typeof LbSkeletonItem;
  }
}
