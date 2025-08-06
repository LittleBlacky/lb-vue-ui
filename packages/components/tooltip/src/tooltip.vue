<template>
  <div ref="toollipRef" :class="[bem.b()]">
    <div ref="triggerRef" :class="[bem.e('trigger')]">
      <slot></slot>
    </div>
    <Transition :name="transition">
      <div
        v-show="!disabled && visibleRef"
        ref="popperRef"
        :class="{
          [`${popperClass}`]: popperClass,
          [bem.e('popper')]: true,
        }"
      >
        <slot name="content">
          <div :class="[bem.e('content')]">{{ content }}</div>
        </slot>
        <div
          ref="arrowRef"
          data-popper-arrow
          :class="[bem.e('arrow'), bem.em('arrow', placementRef.split('-')[0])]"
        ></div>
      </div>
    </Transition>
  </div>
</template>
<script setup lang="ts">
import type {
  LbToolTipInstance,
  LbToolTipOuterEvents,
  LbToolTipProps,
  LbToolTipTriggerOptions,
} from "./types.ts";
import {
  computePosition,
  autoUpdate,
  flip,
  shift,
  offset,
  arrow,
  type ReferenceElement,
  type FloatingElement,
} from "@floating-ui/dom";
import {
  computed,
  onBeforeUnmount,
  onMounted,
  type Ref,
  ref,
  toRef,
  unref,
  type UnwrapRef,
  watch,
} from "vue";
import { useDebounce, useClickOutside } from "@lb-vue-ui/hooks";
import { createNamespace } from "@lb-vue-ui/utils";
defineOptions({
  name: "LbTooltip",
});
const bem = createNamespace("tooltip");
const props = withDefaults(defineProps<LbToolTipProps>(), {
  showAfter: 300,
  hideAfter: 300,
  content: "",
  placement: "top",
  trigger: "hover",
  disabled: false,
  strategy: "absolute",
  transition: "lb-fade",
  offset: 9,
  visible: false,
});
const toollipRef = ref<HTMLElement>();
const popperRef = ref<FloatingElement>();
const triggerRef = ref<ReferenceElement>();
const arrowRef = ref<HTMLElement>();
const placementRef = ref<string>(props.placement);
const referenceRef = ref<ReferenceElement>();
let cleanPopper: () => void = () => {};
useClickOutside(referenceRef as Ref<HTMLElement>, () => {
  hide();
});
const visibleRef = ref(props.visible);
const emits = defineEmits(["update:visible"]);

const { registDebounced } = useDebounce();

const showRef = toRef(props, "showAfter");
const hideRef = toRef(props, "hideAfter");

const show = () => {
  if (visibleRef.value) return;
  registDebounced(() => {
    visibleRef.value = true;
  }, unref(showRef));
};

const hide = () => {
  if (!visibleRef.value) return;
  registDebounced(() => {
    visibleRef.value = false;
  }, unref(hideRef));
};

const updatePosition = () => {
  cleanPopper = autoUpdate(
    referenceRef.value as ReferenceElement,
    popperRef.value as FloatingElement,
    () => {
      if (referenceRef.value && popperRef.value)
        computePosition(referenceRef.value, popperRef.value, {
          placement: props.placement,
          strategy: props.strategy,
          middleware: [
            offset(props.offset),
            flip(),
            shift({ padding: 5 }),
            arrow({ element: arrowRef.value as Element }),
          ],
        }).then(({ x, y, placement, middlewareData }) => {
          placementRef.value = placement;
          console.log(placementRef.value);
          if (popperRef.value)
            Object.assign(popperRef.value.style, {
              left: `${x}px`,
              top: `${y}px`,
            });
          const { x: arrowX, y: arrowY } = middlewareData.arrow as {
            x: number;
            y: number;
          };
          const staticSide: string = {
            top: "bottom",
            right: "left",
            bottom: "top",
            left: "right",
          }[placement?.split("-")[0]] as string;
          if (arrowRef.value)
            Object.assign(arrowRef.value.style, {
              left: arrowX != null ? `${arrowX}px` : "",
              top: arrowY != null ? `${arrowY}px` : "",
              right: "",
              bottom: "",
              [staticSide]: `${-arrowRef.value.offsetWidth / 2}px`,
            });
        });
    }
  );
};

const triggerEvents = {
  hover: {
    mouseenter: show,
    mouseleave: hide,
  },
  click: {
    click: () => {
      if (visibleRef.value) hide();
      else show();
    },
  },
  focus: {
    focusin: show,
    focusout: hide,
  },
};

const events: LbToolTipOuterEvents | Ref<null> = computed(() => {
  if (props.virtualRef) return null;
  const { trigger } = props;
  return triggerEvents[trigger];
});

const cleanEventListener = (
  targetElement: HTMLElement,
  events: UnwrapRef<LbToolTipOuterEvents> | null
) => {
  if (!targetElement || !events) return;
  Object.entries(events).forEach((item) => {
    const [event, callback] = item;
    targetElement.removeEventListener(event, callback);
  });
};

const setEventListener = (
  targetElement: HTMLElement,
  events: UnwrapRef<LbToolTipOuterEvents> | null
) => {
  if (!targetElement || !events) return;
  Object.entries(events).forEach((item) => {
    const [event, callback] = item;
    targetElement.addEventListener(event, callback);
  });
};

onMounted(() => {
  watch(
    (): [HTMLElement | undefined, LbToolTipTriggerOptions] => [
      props.virtualRef,
      props.trigger,
    ],
    (oldValue) => {
      const [oldVirtualRef, oldTrigger] = oldValue;
      // 当原来的不属于虚拟触发时，即普通模式下，需要清空事件监听
      if (oldTrigger && !oldVirtualRef) {
        const oldEvents = triggerEvents[oldTrigger];
        cleanEventListener(referenceRef.value as HTMLElement, oldEvents);
      }
      referenceRef.value = props.virtualRef || triggerRef.value;
      setEventListener(referenceRef.value as HTMLElement, events.value);
      updatePosition();
    },
    {
      immediate: true,
    }
  );
  watch(
    visibleRef,
    (val) => {
      if (val) {
        updatePosition();
      } else {
        cleanPopper();
      }
      emits("update:visible", val);
    },
    { immediate: true }
  );
});

onBeforeUnmount(() => {
  cleanEventListener(referenceRef.value as HTMLElement, events.value);
  cleanPopper();
});
defineExpose<LbToolTipInstance>({
  popperRef: popperRef as Ref<HTMLElement>,
  show: show,
  hide: hide,
  updatePosition: updatePosition,
});
</script>
