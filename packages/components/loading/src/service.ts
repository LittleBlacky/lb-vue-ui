import { createApp } from "vue";
import type { VNode } from "vue";
import Loading from "./loading.vue";
import type { LoadingOptions, LoadingInstance } from "./types";

let instance: LoadingInstance | null = null;

const LoadingService = (options: LoadingOptions = {}) => {
  if (instance) {
    instance.setText(options.text || "");
    return instance;
  }

  const app = createApp(Loading, options);
  const vm = app.mount(document.createElement("div")) as LoadingInstance;
  document.body.appendChild(vm.$el);

  instance = vm;

  return {
    close: () => {
      instance?.close();
      instance = null;
    },
  };
};

export default LoadingService;
