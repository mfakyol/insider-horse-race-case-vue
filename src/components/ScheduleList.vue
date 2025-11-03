<template>
  <div :class="$style.scheduleList">
    <Title bgColor="var(--color-blue)">Program</Title>
    <template v-if="raceSchedule.length > 0">
      <div v-for="race in raceSchedule" :key="race.round" :class="$style.raceCard">
        <Title bgColor="var(--color-pink)" size="medium">
          {{ `${race.round}${getNumberSuffix(race.round, true)} Lap - ${race.distance}m` }}
        </Title>

        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Track</TableHeader>
              <TableHeader>Name</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow v-for="(horse, index) in race.participants" :key="horse.id">
              <TableData>{{ index + 1 }}</TableData>
              <TableData>{{ horse.name }}</TableData>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </template>
    <p v-else :class="$style.noProgram">No program available. Please generate a program.</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Table from '@/components/ui/Table.vue'
import TableHead from '@/components/ui/TableHead.vue'
import TableBody from '@/components/ui/TableBody.vue'
import TableRow from '@/components/ui/TableRow.vue'
import TableHeader from '@/components/ui/TableHeader.vue'
import TableData from '@/components/ui/TableData.vue'
import Title from '@/components/ui/Title.vue'
import { useRaceStore } from '@/stores/raceStore'
import { getNumberSuffix } from '@/utils/getNumberSuffix'

const raceStore = useRaceStore()

const raceSchedule = computed(() => raceStore.raceSchedule)
</script>

<style module lang="scss">
.scheduleList {
  height: 100%;
  width: 20rem;
  overflow-y: auto;
  border-left: 1px solid #ddd;
}

.noProgram {
  text-align: center;
  font-size: 1rem;
  color: var(--color-text-secondary);
  margin-top: 2rem;
  font-weight: 500;
  padding: 0 1rem;
}

.raceCard {
}
</style>
