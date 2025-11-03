<!-- TableData.vue -->
<template>
  <td :class="dataClasses" v-bind="$attrs">
    <slot />
  </td>
</template>

<script setup lang="ts">
import { computed, useCssModule } from 'vue'

interface TableDataProps {
  class?: string
}

const props = defineProps<TableDataProps>()

defineOptions({
  inheritAttrs: false,
})

const $style = useCssModule()
const dataClasses = computed(() => [$style.td, props.class])
</script>

<style module lang="scss">
.td {
  border: 1px solid #ddd;
  padding: 0.5rem;
  text-align: center;
}
</style>
