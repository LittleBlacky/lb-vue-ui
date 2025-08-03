import Loading from "./src/loading.vue";
import { withInstall } from "@lb-vue-ui/utils/install";

export const LbLoading = withInstall(Loading);

export default LbLoading;

export * from "./src/types";

declare module "vue" {
  export interface GlobalComponents {
    LbLoading: typeof LbLoading;
  }
}
