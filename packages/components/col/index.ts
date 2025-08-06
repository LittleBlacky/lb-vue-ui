import Col from "./src/col.vue";
import { withInstall } from "@lb-vue-ui/utils";

export const LbCol = withInstall(Col);

export default LbCol;

export * from "./src/types";

declare module "vue" {
  export interface GlobalComponents {
    LbCol: typeof LbCol;
  }
}
