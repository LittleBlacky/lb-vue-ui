import Footer from "./src/footer.vue";
import { withInstall } from "@lb-vue-ui/utils";

export const LbFooter = withInstall(Footer);

export default LbFooter;

export * from "./src/types";

declare module "vue" {
  export interface GlobalComponents {
    LbFooter: typeof LbFooter;
  }
}
