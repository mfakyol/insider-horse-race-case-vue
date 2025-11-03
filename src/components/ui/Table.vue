<!-- eslint-disable vue/multi-word-component-names -->
<!-- Table.vue -->
<template>
  <table :class="tableClasses" v-bind="$attrs">
    <slot />
  </table>
</template>

<script setup lang="ts">
import { computed, useCssModule } from 'vue'

interface TableProps {
  class?: string
}

const props = defineProps<TableProps>()

defineOptions({
  inheritAttrs: false,
})

const $style = useCssModule()
const tableClasses = computed(() => [$style.table, props.class])
</script>

<style module lang="scss">
.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9375rem;
}

.thead {
  background-color: #f9f9f9;
}

.tbody {
  background-color: var(--white);
}

.th,
.td {
  border: 1px solid #ddd;
  padding: 0.5rem;
  text-align: center;
}

.Thead {
  background-color: #f4f4f4;
}

.tr:hover {
  background-color: #e9e9e9;

  &:nth-child(even) {
    background-color: #f5f5f5;
  }
}
</style>
