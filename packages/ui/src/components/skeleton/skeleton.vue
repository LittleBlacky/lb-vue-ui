<template>
  <template v-if="loading">
    <div :class="classes" :style="itemStyle" v-bind="$attrs">
      <template v-for="i in count" :key="i">
        <slot v-if="loading" name="template" :key="i">
          <LbSkeletonItem :class="[bem.is('first')]" variant="text" />
          <LbSkeletonItem
            v-for="item in rows"
            :key="item"
            :class="[bem.is('last', item === rows && rows > 1)]"
            variant="text"
          />
        </slot>
      </template>
    </div>
  </template>
  <template v-else>
    <slot v-bind="$attrs"></slot>
  </template>
</template>

<script lang="ts" setup>
import { computed, provide } from 'vue'
import { createNamespace } from '@/utils/createNamespace'
import type { LbSkeletonProps } from './types'
import LbSkeletonItem from '../skeleton-item/skeleton-item.vue'

defineOptions({
  name: 'LbSkeleton',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<LbSkeletonProps>(), {
  animated: false,
  rows: 0,
  count: 1,
  loading: true,
  throttle: 0,
  duration: 1.5,
  variant: 'text',
})

const bem = createNamespace('skeleton')

const classes = computed(() => {
  return [bem.b()]
})

const itemStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.animated) {
    style.animationDuration = `${props.duration}s`
  }
  return style
})

provide('LbSkeletonContext', { animated: props.animated, duration: props.duration })
</script>
