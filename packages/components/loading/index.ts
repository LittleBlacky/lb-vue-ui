import Loading from "./src/loading.vue";
import LoadingDirective from "./src/directive";
import LoadingService, { showLoading } from "./src/service";
import { withInstallDirective, withInstall } from "@lb-vue-ui/utils";
import type { App } from "vue";

const LbLoadingDirective = withInstallDirective(LoadingDirective, "loading");

const LbLoadingComponent = withInstall(Loading);

const originalInstall = LbLoadingComponent.install;
LbLoadingComponent.install = (app: App) => {
  originalInstall(app);
  app.directive("loading", LbLoadingDirective);
};

LbLoadingComponent.service = showLoading;

export const LbLoading = LbLoadingComponent;
export { LbLoadingDirective };
export const LbLoadingService = LoadingService;

export default LbLoading;

export * from "./src/types";

declare module "vue" {
  export interface GlobalComponents {
    LbLoading: typeof LbLoading;
  }
}
