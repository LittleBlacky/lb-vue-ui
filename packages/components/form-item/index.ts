import FormItem from "./src/form-item.vue";
import { withInstall } from "@lb-vue-ui/utils/install";

export const LbFormItem = withInstall(FormItem);

export default LbFormItem;

export * from "./src/types";

declare module "vue" {
  export interface GlobalComponents {
    LbFormItem: typeof LbFormItem;
  }
}
