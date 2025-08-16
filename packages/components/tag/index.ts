import Tag from "./src/tag.vue";
import { withInstall } from "@lb-vue-ui/utils";

export const LbTag = withInstall(Tag);

export default LbTag;

export * from "./src/types";

declare module "vue" {
  export interface GlobalComponents {
    LbTag: typeof LbTag;
  }
}
