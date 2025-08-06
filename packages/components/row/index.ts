import Row from "./src/row.vue";
import { withInstall } from "@lb-vue-ui/utils";

export const LbRow = withInstall(Row);

export default LbRow;

export * from "./src/types";

declare module "vue" {
  export interface GlobalComponents {
    LbRow: typeof LbRow;
  }
}
