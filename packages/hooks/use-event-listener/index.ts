import { onBeforeUnmount, onMounted } from "vue";

export interface UseEventListenerReturn {
  (): void;
}

export function useEventListener(
  event: string,
  handler: EventListener,
  target: EventTarget = window
): UseEventListenerReturn {
  const cleanup = () => {
    target.removeEventListener(event, handler);
  };

  onMounted(() => {
    target.addEventListener(event, handler);
  });

  onBeforeUnmount(() => {
    cleanup();
  });

  return cleanup;
}
