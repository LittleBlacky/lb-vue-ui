import { watch, type Ref } from "vue";

export interface UseResizeObserverReturn {
  stop: () => void;
}

export function useResizeObserver(
  target: Ref<HTMLElement | undefined>,
  callback: () => void
): UseResizeObserverReturn {
  let observer: ResizeObserver | undefined;

  const cleanup = () => {
    if (observer) {
      observer.disconnect();
      observer = undefined;
    }
  };

  const observe = () => {
    if (target.value && window.ResizeObserver) {
      observer = new ResizeObserver(callback);
      observer.observe(target.value);
    }
  };

  watch(
    target,
    (newTarget) => {
      cleanup();
      if (newTarget) {
        observe();
      }
    },
    { immediate: true }
  );

  return { stop: cleanup };
}
