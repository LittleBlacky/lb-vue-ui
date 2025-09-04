<template>
  <div :class="classes" :style="styles">
    <label v-if="hasLabel" :class="bem.e('label')">
      <span v-if="isRequired && asteriskLeft" :class="bem.e('asterisk')"
        >*</span
      >
      <span :class="bem.e('label-text')"
        >{{ props.label
        }}<template v-if="formProps.labelSuffix">{{
          formProps.labelSuffix
        }}</template></span
      >
      <span v-if="isRequired && !asteriskLeft" :class="bem.e('asterisk')"
        >*</span
      >
    </label>
    <div :class="bem.e('content')">
      <slot />
      <Transition name="lb-fade">
        <span
          :style="{ visibility: displayMessage ? 'visible' : 'hidden' }"
          :class="bem.e('message')"
          >{{ message || "blank" }}</span
        >
      </Transition>
      <div v-if="props.help" :class="bem.e('help')">{{ props.help }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, inject, onMounted, onBeforeUnmount, ref, watch } from "vue";
import type { LbFormItemProps } from "./types";
import type { LbFormContext } from "@lb-vue-ui/components";
import { formContextKey } from "@lb-vue-ui/components";
import { createNamespace } from "@lb-vue-ui/utils";
import Schema from "async-validator";

const bem = createNamespace("form-item");

defineOptions({
  name: "LbFormItem",
});

const props = withDefaults(defineProps<LbFormItemProps>(), {
  showMessage: undefined,
  inlineMessage: undefined,
});
const emit = defineEmits<{
  (e: "validate", isValid: boolean, message?: string): void;
}>();

const form = inject<LbFormContext | undefined>(formContextKey, undefined);
const formProps = computed(() => form?.props ?? ({} as any));

const isRequired = computed(() => {
  if (props.required) return true;
  const rules = formProps.value?.rules;
  const ruleList = (props.prop && rules?.[props.prop]) || [];
  const arr = Array.isArray(ruleList) ? ruleList : [ruleList];
  return arr.some((r) => r && (r as any).required);
});

const asteriskLeft = computed(
  () => formProps.value?.requireAsteriskPosition !== "right"
);

const hasLabel = computed(() => !!props.label);

const classes = computed(() => {
  return [
    bem.b(),
    {
      [bem.m("required")]: isRequired.value,
      [bem.m("inline")]: formProps.value?.inline,
      [bem.m("inline-message")]: !!inlineMessage.value,
      ["is-error"]: !!message.value,
      ["is-disabled"]: formProps.value?.disabled,
      [bem.m(`label-${formProps.value?.labelPosition}`)]: true,
    },
  ];
});

const styles = computed(() => {
  const style: Record<string, string> = {};
  const width = props.labelWidth ?? formProps.value?.labelWidth;
  const align = props.labelAlign ?? formProps.value?.labelAlign;
  if (width != null) {
    const val = typeof width === "number" ? `${width}px` : String(width);
    style["--lb-form-label-width"] = val;
  }
  if (align) style["--lb-form-label-text-align"] = align;
  return style;
});

const message = ref("");
const inlineMessage = computed(
  () => props.inlineMessage ?? formProps.value?.inlineMessage
);
const displayMessage = computed(() => {
  const show = props.showMessage ?? formProps.value?.showMessage;
  return !!show && !!message.value;
});

const doValidate = async (trigger?: "change" | "blur") => {
  if (!props.prop || !formProps.value?.rules) return true;
  const model = formProps.value.model || {};
  const ruleList = formProps.value.rules[props.prop];
  const rules = (Array.isArray(ruleList) ? ruleList : [ruleList])
    .filter(Boolean)
    .filter((r: any) => {
      if (!r?.trigger) return true;
      const triggers = Array.isArray(r.trigger) ? r.trigger : [r.trigger];
      return trigger ? triggers.includes(trigger) : true;
    });
  if (rules.length === 0) return true;

  const descriptor: Record<string, any> = { [props.prop]: rules };
  const validator = new Schema(descriptor);
  try {
    await validator.validate(
      { [props.prop]: model[props.prop] },
      { first: true }
    );
    message.value = "";
    emit("validate", true);
    return true;
  } catch (err: any) {
    const first = err?.errors?.[0];
    const msg = first?.message || "校验未通过";
    message.value = msg;
    emit("validate", false, msg);
    return false;
  }
};

const validate = (trigger?: "change" | "blur") => doValidate(trigger);
const resetField = () => {
  message.value = "";
};

onMounted(() => {
  form?.addField?.({ prop: props.prop, validate, resetField });
});
onBeforeUnmount(() => {
  form?.removeField?.({ prop: props.prop, validate, resetField });
});

// 监听模型变化，触发 change 校验
watch(
  () => (props.prop ? formProps.value?.model?.[props.prop] : undefined),
  () => {
    void doValidate("change");
  }
);
</script>
