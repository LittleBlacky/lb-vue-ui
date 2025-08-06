import type { App, Component, Plugin } from "vue";

export function withInstall<T extends Component>(component: T): T & Plugin {
  if (!component.name) {
    throw new Error("Component must have a name");
  }
  return {
    ...component,
    install: (app: App) => {
      app.component(component.name as string, component);
    },
  };
}
