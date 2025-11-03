<!-- TableRow.vue -->
<template>
  <tr :class="rowClasses" v-bind="$attrs">
    <slot />
  </tr>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCssModule } from 'vue'

interface TableRowProps {
  class?: string
}

const props = defineProps<TableRowProps>()

defineOptions({
  inheritAttrs: false,
})

const $style = useCssModule()

const rowClasses = computed(() => [$style.tr, props.class])
</script>

<style module lang="scss">
.tr:hover {
  background-color: #e9e9e9;

  &:nth-child(even) {
    background-color: #f5f5f5;
  }
}
</style>
