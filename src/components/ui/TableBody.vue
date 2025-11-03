<!-- TableBody.vue -->
<template>
  <tbody :class="bodyClasses" v-bind="$attrs">
    <slot />
  </tbody>
</template>

<script setup lang="ts">
import { computed, useCssModule } from 'vue'

interface TableBodyProps {
  class?: string
}

const props = defineProps<TableBodyProps>()

defineOptions({
  inheritAttrs: false,
})

const $style = useCssModule()
const bodyClasses = computed(() => [$style.tbody, props.class])
</script>

<style module lang="scss">
.tbody {
  background-color: var(--white);
}
</style>
