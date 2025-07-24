import Container from "./src/container.vue";
import { withInstall } from "@lb-vue-ui/utils/install";

export const LbContainer = withInstall(Container);

export default LbContainer;

export * from "./src/types";

declare module "vue" {
  export interface GlobalComponents {
    LbContainer: typeof LbContainer;
  }
}
