import { createApp } from "vue";
import type { Directive, VNode } from "vue";
import type { LoadingOptions, LoadingInstance } from "./types";
import Loading from "./loading.vue";

const createInstance = (el: HTMLElement, binding: VNode) => {
  const fullscreen = binding.props?.fullscreen ?? false;
  const lock = binding.props?.lock ?? false;
  const text = binding.props?.text ?? "";
  const background = binding.props?.background ?? "";
  const customClass = binding.props?.customClass ?? "";

  const options: LoadingOptions = {
    text,
    background,
    fullscreen,
    lock,
    customClass,
  };

  const instance = createApp(Loading, options);
  const vm = instance.mount(document.createElement("div")) as LoadingInstance;
  el.appendChild(vm.$el);

  if (fullscreen) {
    document.body.style.overflow = "hidden";
  }

  return vm;
};

const vLoading: Directive = {
  mounted(el, binding) {
    if (binding.value) {
      el.instance = createInstance(el, binding);
    }
  },
  updated(el, binding) {
    if (binding.value !== binding.oldValue) {
      if (binding.value) {
        el.instance = createInstance(el, binding);
      } else {
        el.instance?.close();
        if (el.instance?.fullscreen) {
          document.body.style.overflow = "";
        }
        el.instance = null;
      }
    }
  },
  unmounted(el) {
    el.instance?.close();
    el.instance = null;
  },
};

export default vLoading;
