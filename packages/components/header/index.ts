import Header from "./src/header.vue";
import { withInstall } from "@lb-vue-ui/utils";

export const LbHeader = withInstall(Header);

export default LbHeader;

export * from "./src/types";

declare module "vue" {
  export interface GlobalComponents {
    LbHeader: typeof LbHeader;
  }
}
