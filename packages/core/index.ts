import { type App } from "vue";
import * as components from "../components";

const LbUI = {
  name: "LbUI",
  install: (app: App) => {
    Object.values(components).forEach((component) => {
      if (component.install) {
        app.use(component);
      } else {
        app.component(component.name, component);
      }
    });
  },
};

export default LbUI;

export * from "../components";
