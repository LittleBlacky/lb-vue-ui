import Input from "./src/input.vue";
import { withInstall } from "@lb-vue-ui/utils/install";

export const LbInput = withInstall(Input);

export default LbInput;

export * from "./src/types";

declare module "vue" {
  export interface GlobalComponents {
    LbInput: typeof LbInput;
  }
}
