import Card from "./src/card.vue";
import { withInstall } from "@lb-vue-ui/utils/install";

export const LbCard = withInstall(Card);

export default LbCard;

export * from "./src/types";

declare module "vue" {
  export interface GlobalComponents {
    LbCard: typeof LbCard;
  }
}
