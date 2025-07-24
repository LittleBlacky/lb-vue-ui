import { type App } from "vue";
import * as components from "./components";
export default {
  name: "LbUI",
  ...components,
  install: (app: App) => {
    Object.entries(components).forEach(([key, value]) => {
      app.component(key as string, value);
    });
  },
};

export * from "./components";
