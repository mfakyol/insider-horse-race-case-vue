<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div :class="titleClasses" :style="titleStyles" v-bind="$attrs">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, useCssModule } from 'vue'

interface TitleProps {
  bgColor?: string
  size?: 'large' | 'medium'
  class?: string
  style?: Record<string, string | number>
}

const props = withDefaults(defineProps<TitleProps>(), {
  size: 'large',
})

defineOptions({
  inheritAttrs: false,
})

const $style = useCssModule()
const titleClasses = computed(() => [$style.title, $style[props.size], props.class])

const titleStyles = computed(() => ({
  ...props.style,
  backgroundColor: props.bgColor,
}))
</script>

<style module lang="scss">
.title {
  text-align: center;

  &.large {
    font-size: 1.5rem;
    font-weight: bold;
  }

  &.medium {
    font-size: 1rem;
    font-weight: 600;
  }
}
</style>
