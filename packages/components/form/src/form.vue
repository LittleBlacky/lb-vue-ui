<template>
  <form :class="classes" :style="styles" @submit.prevent>
    <slot />
  </form>
</template>
<script setup lang="ts">
import { computed, provide, reactive, watch, toRaw, defineExpose } from "vue";
import type {
  LbFormProps,
  LbFormEmits,
  LbFormContext,
  LbFormItemContext,
} from "./types";
import { formContextKey } from "./types";
import { createNamespace } from "@lb-vue-ui/utils";

const bem = createNamespace("form");

defineOptions({
  name: "LbForm",
});

const props = withDefaults(defineProps<LbFormProps>(), {
  model: () => ({}),
  rules: undefined,
  inline: false,
  disabled: false,
  size: undefined,
  labelPosition: "right",
  labelWidth: undefined,
  labelAlign: undefined,
  labelSuffix: "",
  showMessage: true,
  inlineMessage: false,
  statusIcon: false,
  validateOnRuleChange: true,
  hideRequiredAsterisk: false,
  requireAsteriskPosition: "left",
});

const emit = defineEmits<LbFormEmits>();

const fields = reactive<Set<LbFormItemContext>>(new Set());

const addField = (field: LbFormItemContext) => {
  fields.add(field);
};
const removeField = (field: LbFormItemContext) => {
  fields.delete(field);
};

const validateField = async (prop: string, trigger?: "change" | "blur") => {
  let target: LbFormItemContext | undefined;
  fields.forEach((f) => {
    if (f.prop === prop) target = f;
  });
  if (!target) return true;
  const ok = await target.validate(trigger);
  return ok;
};

const validate = async () => {
  const tasks: Promise<boolean>[] = [];
  fields.forEach((f) => tasks.push(f.validate()));
  const results = await Promise.all(tasks);
  return results.every(Boolean);
};

const resetFields = () => {
  fields.forEach((f) => f.resetField());
  // 尝试将空字符串/undefined 置回初始值；此处简单清理为空字符串
  if (props.model) {
    Object.keys(props.model).forEach((k) => {
      // 保持引用不变
      (props.model as any)[k] = (props.model as any)[k] ?? "";
    });
  }
};

const clearValidate = (propsOrArr?: string | string[]) => {
  const targets = new Set<string>();
  if (!propsOrArr) {
    fields.forEach((f) => f.prop && targets.add(f.prop));
  } else if (Array.isArray(propsOrArr)) {
    propsOrArr.forEach((p) => targets.add(p));
  } else {
    targets.add(propsOrArr);
  }
  fields.forEach((f) => {
    if (!f.prop || !targets.has(f.prop)) return;
    f.resetField();
  });
};

const formContext: LbFormContext = {
  props,
  addField,
  removeField,
  validateField,
  validate,
  resetFields,
  clearValidate,
};

provide(formContextKey, formContext);

const classes = computed(() => {
  return [
    bem.b(),
    {
      [bem.m("inline")]: props.inline,
      [bem.m(`label-${props.labelPosition}`)]: true,
      [bem.m(`size-${props.size}`)]: !!props.size,
      ["is-disabled"]: props.disabled,
    },
  ];
});

const styles = computed(() => {
  const style: Record<string, string> = {};
  if (props.labelWidth != null) {
    const val =
      typeof props.labelWidth === "number"
        ? `${props.labelWidth}px`
        : String(props.labelWidth);
    style["--lb-form-label-width"] = val;
  }
  if (props.labelAlign) {
    style["--lb-form-label-text-align"] = props.labelAlign;
  }
  return style;
});

defineExpose({
  validate,
  validateField,
  resetFields,
  clearValidate,
});
</script>
