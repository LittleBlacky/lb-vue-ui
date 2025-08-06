import VirtualList from "./src/virtual-list.vue";
import { withInstall } from "@lb-vue-ui/utils";

export const LbVirtualList = withInstall(VirtualList);

export default LbVirtualList;

export * from "./src/types";

declare module "vue" {
  export interface GlobalComponents {
    LbVirtualList: typeof LbVirtualList;
  }
}
