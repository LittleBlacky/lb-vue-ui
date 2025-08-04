import type { App } from "vue";
import Loading from "./src/loading.vue";
import vLoading from "./src/directive";
import LoadingService from "./src/service";

(Loading as any).install = (app: App) => {
  app.component(Loading.name, Loading);
  app.directive("loading", vLoading);
  app.config.globalProperties.$loading = LoadingService;
};

export const LbLoading = Loading;

export default LbLoading;

export * from "./src/types";

export { vLoading, LoadingService };

declare module "vue" {
  export interface GlobalComponents {
    LbLoading: typeof LbLoading;
  }
  export interface ComponentCustomProperties {
    $loading: typeof LoadingService;
  }
}
