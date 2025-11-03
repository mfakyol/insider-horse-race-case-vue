<!-- TableHeader.vue -->
<template>
  <th :class="headerClasses" v-bind="$attrs">
    <slot />
  </th>
</template>

<script setup lang="ts">
import { computed, useCssModule } from 'vue'

interface TableHeaderProps {
  class?: string
}

const props = defineProps<TableHeaderProps>()

defineOptions({
  inheritAttrs: false,
})
const $style = useCssModule()
const headerClasses = computed(() => [$style.th, props.class])
</script>

<style module lang="scss">
.th {
  border: 1px solid #ddd;
  padding: 0.5rem;
  text-align: center;
}
</style>
