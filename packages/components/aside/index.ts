import AsideComponent from "./src/aside.vue";
import { withInstall } from "@lb-vue-ui/utils/install";

export const LbAside = withInstall(AsideComponent);

export default LbAside;

export * from "./src/types";

declare module "vue" {
  export interface GlobalComponents {
    LbAside: typeof LbAside;
  }
}
