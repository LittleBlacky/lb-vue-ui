import Main from "./src/main.vue";
import { withInstall } from "@lb-vue-ui/utils/install";

export const LbMain = withInstall(Main);

export default LbMain;

export * from "./src/types";

declare module "vue" {
  export interface GlobalComponents {
    LbMain: typeof LbMain;
  }
}
