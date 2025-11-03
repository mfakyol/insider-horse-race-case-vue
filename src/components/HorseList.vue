<template>
  <div :class="$style.horseList">
    <Title bgColor="var(--color-yellow)"> Horse List (1 - {{ horses.length }}) </Title>
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader>Name</TableHeader>
          <TableHeader>Condition</TableHeader>
          <TableHeader>Appearance</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow
          v-for="horse in horses"
          :key="horse.id"
          :class="isActiveHorse(horse.id) ? $style.activeHorse : ''"
        >
          <TableData>{{ horse.name }}</TableData>
          <TableData>{{ horse.condition }}</TableData>
          <TableData>
            <HorseIcon
              :class="$style.horseIcon"
              :aria-label="`${horse.name} icon`"
              :style="{ fill: horse.color }"
            />
          </TableData>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Title from './ui/Title.vue'
import Table from './ui/Table.vue'
import TableHead from './ui/TableHead.vue'
import TableBody from './ui/TableBody.vue'
import TableRow from './ui/TableRow.vue'
import TableHeader from './ui/TableHeader.vue'
import TableData from './ui/TableData.vue'
import HorseIcon from '@/assets/horse.svg?component'
import { useRaceStore } from '@/stores/raceStore'

const raceStore = useRaceStore()

const horses = computed(() => raceStore.allHorses)

const currentRoundData = computed(() => raceStore.currentRoundData)

const isActiveHorse = (horseId: number) => {
  return currentRoundData.value?.participants.some((h) => h.id === horseId)
}
</script>

<style module lang="scss">
.horseList {
  height: 100%;
  width: 20rem;
  overflow-y: auto;
}

.horseItem {
  margin-bottom: 0.5rem;
}

.activeHorse {
  background-color: var(--color-pink) !important;
}

.horseIcon {
  width: 32px;
  height: 32px;
  filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.3));
}
</style>
