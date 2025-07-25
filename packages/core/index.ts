import {type App} from "vue";
import * as components from "@lb-vue-ui/components";
import "@lb-vue-ui/theme-chalk/src/index.scss";
export default {
  name: "LbUI",
  ...components,
  install: (app: App) => {
    Object.entries(components).forEach(([key, value]) => {
      app.component(key as string, value);
    });
  },
};
export * from "@lb-vue-ui/components";
