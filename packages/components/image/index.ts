import Image from "./src/image.vue";
import { withInstall } from "@lb-vue-ui/utils";

export const LbImage = withInstall(Image);

export default LbImage;

export * from "./src/types";

declare module "vue" {
  export interface GlobalComponents {
    LbImage: typeof LbImage;
  }
}
