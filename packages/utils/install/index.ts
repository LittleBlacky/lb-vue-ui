import type { App, Component, Plugin, Directive } from "vue";

/**
 * 为组件添加 install 方法，使其可以通过 app.use() 安装
 * @param component Vue 组件
 * @returns 带有 install 方法的组件
 */
export function withInstall<T extends Component>(component: T): T & Plugin {
  const componentWithInstall = component as T & Plugin;
  componentWithInstall.type = "component";
  componentWithInstall.install = (app: App) => {
    app.component(component.name as string, component);
  };

  return componentWithInstall;
}

/**
 * 为指令添加 install 方法，使其可以通过 app.use() 安装
 * @param directive Vue 指令
 * @param name 指令名称
 * @returns 带有 install 方法的指令
 */
export function withInstallDirective<T extends Directive>(
  directive: T,
  name: string
): T & Plugin {
  const directiveWithInstall = directive as T & Plugin;
  directiveWithInstall.type = "directive";
  directiveWithInstall.install = (app: App) => {
    app.directive(name, directive);
  };

  return directiveWithInstall;
}
