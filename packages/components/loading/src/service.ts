import { type App } from "vue";
import type { LbLoadingOptions, LbLoadingInstance } from "./types";
import {
  createLoadingApp,
  createLoadingInstance,
  mountLoadingToTarget,
} from "./loading-utils";

// 全屏loading实例管理（单例）
let fullscreenInstance: LbLoadingInstance | null = null;
let fullscreenApp: App | null = null;

// 局部loading实例管理（支持多个）
const localInstances: LbLoadingInstance[] = [];

/**
 * 创建loading服务实例
 */
const createLoadingService = (
  options: LbLoadingOptions = {}
): LbLoadingInstance => {
  // 默认配置 - 如果指定了target，则不是全屏
  const defaultOptions: LbLoadingOptions = {
    text: "加载中...",
    fullscreen: !options.target, // 有target时为局部，无target时为全屏
    lock: true,
    background: "rgba(0, 0, 0, 0.7)",
    ...options,
  };

  const isFullscreen = defaultOptions.fullscreen;

  // 如果是全屏loading且已存在实例，复用现有实例（单例模式）
  if (isFullscreen && fullscreenInstance) {
    // 更新现有实例的配置
    if (defaultOptions.text !== undefined) {
      fullscreenInstance.setText(defaultOptions.text);
    }

    // 更新背景色等样式（如果需要）
    if (defaultOptions.background && fullscreenInstance.$el) {
      const loadingEl = fullscreenInstance.$el.querySelector(
        ".lb-loading"
      ) as HTMLElement;
      if (loadingEl) {
        loadingEl.style.backgroundColor = defaultOptions.background;
      }
    }

    // 确保实例可见
    fullscreenInstance.setVisible(true);
    return fullscreenInstance;
  }

  // 创建Vue应用实例
  const { app, vm } = createLoadingApp(defaultOptions);

  // 创建实例对象
  const instance = createLoadingInstance(vm, app, defaultOptions, () => {
    // 服务式调用的额外清理逻辑
    if (isFullscreen) {
      fullscreenApp = null;
      fullscreenInstance = null;
    } else {
      // 从局部实例数组中移除
      const index = localInstances.indexOf(instance);
      if (index > -1) {
        localInstances.splice(index, 1);
      }
    }
  });

  // 根据类型管理实例
  if (isFullscreen) {
    fullscreenApp = app;
    fullscreenInstance = instance;
  } else {
    localInstances.push(instance);
  }

  // 挂载到DOM
  mountLoadingToTarget(instance.$el, defaultOptions);

  return instance;
};

/**
 * 显示loading
 */
export const showLoading = (options?: LbLoadingOptions): LbLoadingInstance => {
  return createLoadingService(options);
};

/**
 * 关闭loading
 * @param target 可选，指定要关闭的loading类型：'fullscreen' | 'all' | LbLoadingInstance
 */
export const closeLoading = (
  target?: "fullscreen" | "all" | LbLoadingInstance
): void => {
  if (!target) {
    // 默认关闭全屏loading（保持向后兼容）
    if (fullscreenInstance) {
      fullscreenInstance.close();
    }
  } else if (target === "fullscreen") {
    // 关闭全屏loading
    if (fullscreenInstance) {
      fullscreenInstance.close();
    }
  } else if (target === "all") {
    // 关闭所有loading
    if (fullscreenInstance) {
      fullscreenInstance.close();
    }
    // 关闭所有局部loading
    [...localInstances].forEach((instance) => instance.close());
  } else if (typeof target === "object" && target.close) {
    // 关闭指定实例
    target.close();
  }
};

/**
 * 更新loading文本
 * @param text 新的文本内容
 * @param target 可选，指定要更新的loading：'fullscreen' | 'all' | LbLoadingInstance
 */
export const updateLoadingText = (
  text: string,
  target?: "fullscreen" | "all" | LbLoadingInstance
): void => {
  if (!target) {
    // 默认更新全屏loading（保持向后兼容）
    if (fullscreenInstance) {
      fullscreenInstance.setText(text);
    }
  } else if (target === "fullscreen") {
    // 更新全屏loading
    if (fullscreenInstance) {
      fullscreenInstance.setText(text);
    }
  } else if (target === "all") {
    // 更新所有loading
    if (fullscreenInstance) {
      fullscreenInstance.setText(text);
    }
    localInstances.forEach((instance) => instance.setText(text));
  } else if (typeof target === "object" && target.setText) {
    // 更新指定实例
    target.setText(text);
  }
};

/**
 * Loading服务对象
 */
export const LoadingService = {
  show: showLoading,
  close: closeLoading,
  updateText: updateLoadingText,
};

// 默认导出
export default LoadingService;
