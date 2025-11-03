<!-- TableHead.vue -->
<template>
  <thead :class="headClasses" v-bind="$attrs">
    <slot />
  </thead>
</template>

<script setup lang="ts">
import { computed, useCssModule } from 'vue'

interface TableHeadProps {
  class?: string
}

const props = defineProps<TableHeadProps>()

defineOptions({
  inheritAttrs: false,
})

const $style = useCssModule()
const headClasses = computed(() => [$style.thead, props.class])
</script>

<style module lang="scss">
.thead {
  background-color: #f9f9f9;
}
</style>
