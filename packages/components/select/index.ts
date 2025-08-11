import Select from "./src/select.vue";
import { withInstall } from "@lb-vue-ui/utils";

export const LbSelect = withInstall(Select);

export default LbSelect;

export * from "./src/types";

declare module "vue" {
  export interface GlobalComponents {
    LbSelect: typeof LbSelect;
  }
}
