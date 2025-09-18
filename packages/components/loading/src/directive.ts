import { type Directive, type DirectiveBinding } from "vue";
import type { LbLoadingInstance, LbLoadingDirectiveBinding } from "./types";
import {
  createLoadingApp,
  createLoadingInstance,
  mountLoadingToTarget,
  parseDirectiveBinding,
  toggleBodyScroll,
} from "./loading-utils";

const LOADING_INSTANCE_KEY = "LbLoadingInstance";

/**
 * 创建loading实例
 */
const createLbLoadingInstance = (
  el: HTMLElement,
  binding: DirectiveBinding<LbLoadingDirectiveBinding["value"]>
): LbLoadingInstance => {
  // 解析配置选项
  const options = parseDirectiveBinding(binding.value, binding.modifiers);

  // 创建Vue应用实例
  const { app, vm } = createLoadingApp(options);

  // 创建实例对象
  const instance = createLoadingInstance(vm, app, options, () => {
    // 指令式调用的额外清理逻辑
    if (options.fullscreen) {
      toggleBodyScroll(false);
    } else {
      // 恢复目标元素的滚动
      const originalOverflow = (el as any)._originalOverflow;
      if (originalOverflow !== undefined) {
        el.style.overflow = originalOverflow;
        delete (el as any)._originalOverflow;
      }
    }
  });

  // 挂载到目标元素
  mountLoadingToTarget(instance.$el, options, el);

  return instance;
};

/**
 * 销毁loading实例
 */
const destroyLbLoadingInstance = (instance: LbLoadingInstance) => {
  instance.close();
};

/**
 * Loading指令
 */
const Loading = {
  name: "loading",
  mounted(
    el: HTMLElement,
    binding: DirectiveBinding<LbLoadingDirectiveBinding["value"]>
  ) {
    if (binding.value) {
      const instance = createLbLoadingInstance(el, binding);
      (el as any)[LOADING_INSTANCE_KEY] = instance;
    }
  },

  updated(
    el: HTMLElement,
    binding: DirectiveBinding<LbLoadingDirectiveBinding["value"]>
  ) {
    const instance = (el as any)[LOADING_INSTANCE_KEY] as
      | LbLoadingInstance
      | undefined;

    if (binding.value !== binding.oldValue) {
      if (binding.value) {
        // 需要显示loading
        if (instance) {
          // 更新现有实例
          if (typeof binding.value === "string") {
            instance.setText(binding.value);
          } else if (typeof binding.value === "object" && binding.value?.text) {
            instance.setText(binding.value.text);
          }
          instance.setVisible(true);
        } else {
          // 创建新实例
          const newInstance = createLbLoadingInstance(el, binding);
          (el as any)[LOADING_INSTANCE_KEY] = newInstance;
        }
      } else {
        // 需要隐藏loading
        if (instance) {
          destroyLbLoadingInstance(instance);
          (el as any)[LOADING_INSTANCE_KEY] = null;
        }
      }
    }
  },

  beforeUnmount(el: HTMLElement) {
    const instance = (el as any)[LOADING_INSTANCE_KEY] as
      | LbLoadingInstance
      | undefined;
    if (instance) {
      destroyLbLoadingInstance(instance);
      (el as any)[LOADING_INSTANCE_KEY] = null;
    }
  },
};

export default Loading;
