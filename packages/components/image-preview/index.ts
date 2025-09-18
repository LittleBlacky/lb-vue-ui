import ImagePreview from "./src/image-preview.vue";
import { withInstall } from "@lb-vue-ui/utils";

export const LbImagePreview = withInstall(ImagePreview);

export default LbImagePreview;

export * from "./src/types";

declare module "vue" {
  export interface GlobalComponents {
    LbImagePreview: typeof LbImagePreview;
  }
}
