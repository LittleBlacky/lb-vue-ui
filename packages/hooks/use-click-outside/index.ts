import { onBeforeUnmount, onMounted, type Ref } from "vue";

export function useClickOutside(
  elementTarget: Ref<undefined | HTMLElement>,
  callback: (e: MouseEvent) => void
) {
  const handler = (e: MouseEvent) => {
    if (elementTarget.value && e.target) {
      if (!elementTarget.value.contains(e.target as HTMLElement)) {
        callback(e);
      }
    }
  };
  onMounted(() => {
    document.addEventListener("click", handler);
  });
  onBeforeUnmount(() => {
    document.removeEventListener("click", handler);
  });
}
