import { createApp, type App } from "vue";
import type {
  LbLoadingOptions,
  LbLoadingInstance,
  LbLoadingDirectiveBinding,
} from "./types";
import LoadingComponent from "./loading.vue";

/**
 * 创建 Loading 应用实例
 * @param options Loading 配置选项
 * @returns 包含 app 和 vm 的对象
 */
export function createLoadingApp(options: LbLoadingOptions): {
  app: App;
  vm: any;
} {
  const app = createApp(LoadingComponent, {
    ...options,
    visible: true,
  });

  // 创建一个容器来挂载
  const container = document.createElement("div");
  const vm = app.mount(container);

  return { app, vm };
}

/**
 * 创建 Loading 实例对象
 * @param vm Vue 组件实例
 * @param app Vue 应用实例
 * @param options 配置选项
 * @param onDestroy 销毁回调
 * @returns Loading 实例
 */
export function createLoadingInstance(
  vm: any,
  app: App,
  options: LbLoadingOptions,
  onDestroy?: () => void
): LbLoadingInstance {
  const instance: LbLoadingInstance = {
    $el: vm.$el,
    app,
    fullscreen: options.fullscreen,

    close() {
      this.setVisible(false);
      setTimeout(() => {
        if (this.$el && this.$el.parentNode) {
          this.$el.parentNode.removeChild(this.$el);
        }
        if (this.app) {
          this.app.unmount();
        }
        if (onDestroy) {
          onDestroy();
        }
      }, 300); // 等待动画完成
    },

    setText(text: string) {
      if (vm && vm.setText) {
        vm.setText(text);
      } else if (vm && vm.$refs && vm.$refs.loadingText) {
        vm.$refs.loadingText.textContent = text;
      }
    },

    setVisible(visible: boolean) {
      if (vm && vm.setVisible) {
        vm.setVisible(visible);
      } else if (vm && vm.visible !== undefined) {
        vm.visible = visible;
      }
    },
  };

  return instance;
}

/**
 * 将 Loading 实例挂载到目标元素
 * @param el Loading 元素
 * @param options 配置选项
 * @param targetEl 目标元素（可选，用于指令）
 */
export function mountLoadingToTarget(
  el: HTMLElement,
  options: LbLoadingOptions,
  targetEl?: HTMLElement
): void {
  let container: HTMLElement;

  if (options.fullscreen) {
    // 全屏模式，挂载到 body
    container = document.body;
    el.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 9999;
    `;
  } else if (targetEl) {
    // 指令模式，挂载到指定元素
    container = targetEl;
    const position = getComputedStyle(targetEl).position;
    if (position === "static") {
      targetEl.style.position = "relative";
    }
    el.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 999;
    `;
  } else if (options.target) {
    // 服务模式，挂载到指定目标
    if (typeof options.target === "string") {
      container = document.querySelector(options.target) as HTMLElement;
      if (!container) {
        throw new Error(`Target element "${options.target}" not found`);
      }
    } else {
      container = options.target;
    }

    const position = getComputedStyle(container).position;
    if (position === "static") {
      container.style.position = "relative";
    }
    el.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 999;
    `;
  } else {
    // 默认全屏
    container = document.body;
    el.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 9999;
    `;
  }

  container.appendChild(el);

  // 自动禁用滚动条（除了全屏模式）
  if (!options.fullscreen && targetEl) {
    // 保存原始 overflow 值
    (targetEl as any)._originalOverflow = targetEl.style.overflow;
    // 对于指令模式，禁用目标元素的滚动
    targetEl.style.overflow = "hidden";
  } else if (options.fullscreen) {
    // 对于全屏模式，锁定 body 滚动
    toggleBodyScroll(true);
  }
}

/**
 * 解析指令绑定值
 * @param value 绑定值
 * @param modifiers 修饰符
 * @returns 解析后的配置
 */
export function parseDirectiveBinding(
  value: LbLoadingDirectiveBinding["value"],
  modifiers?: any
): LbLoadingOptions {
  let options: LbLoadingOptions = {};

  if (typeof value === "boolean") {
    // 如果是布尔值，只控制显示/隐藏
    options = { visible: value };
  } else if (typeof value === "object" && value !== null) {
    // 如果是对象，使用对象的配置
    options = { ...value };
  }

  // 处理修饰符
  if (modifiers) {
    if (modifiers.fullscreen) {
      options.fullscreen = true;
    }
  }

  return options;
}

/**
 * 切换 body 滚动状态
 * @param lock 是否锁定滚动
 */
export function toggleBodyScroll(lock: boolean): void {
  const body = document.body;

  if (lock) {
    // 保存当前滚动位置
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // 禁用滚动
    body.style.position = "fixed";
    body.style.top = `-${scrollTop}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";
  } else {
    // 恢复滚动
    const scrollTop = Math.abs(parseInt(body.style.top || "0"));
    body.style.position = "";
    body.style.top = "";
    body.style.width = "";
    body.style.overflow = "";

    // 恢复滚动位置
    if (scrollTop) {
      window.scrollTo(0, scrollTop);
    }
  }
}
