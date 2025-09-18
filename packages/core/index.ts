import { type App } from "vue";
import * as components from "../components";
import * as directives from "../directives";

const LbUI = {
  name: "LbUI",
  install: (app: App) => {
    Object.values(components).forEach((component) => {
      app[component.type || "component"](component.name, component);
    });
    Object.values(directives).forEach((directive) => {
      app.directive(directive.name, directive);
    });
  },
};

export default LbUI;

export * from "../components";

export * from "../directives";
