<template>
  <div
    :class="[
      bem.e('item'),
      bem.is(variant),
      bem.is('animated', skeletonContext?.animated),
    ]"
  ></div>
</template>

<script lang="ts" setup>
import { createNamespace } from "@lb-vue-ui/utils";
import { inject } from "vue";
import type { LbSkeletonItemProps } from "./types";
import type { LbSkeletonContext } from "../../skeleton/src/types";

defineOptions({
  name: "LbSkeletonItem",
});

const props = withDefaults(defineProps<LbSkeletonItemProps>(), {
  variant: "text",
});

const bem = createNamespace("skeleton");
const skeletonContext = inject<LbSkeletonContext>("LbSkeletonContext");
</script>
