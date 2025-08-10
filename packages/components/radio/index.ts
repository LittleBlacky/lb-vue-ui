import Radio from "./src/radio.vue";
import { withInstall } from "@lb-vue-ui/utils";

export const LbRadio = withInstall(Radio);

export default LbRadio;

export * from "./src/types";

declare module "vue" {
  export interface GlobalComponents {
    LbRadio: typeof LbRadio;
  }
}
