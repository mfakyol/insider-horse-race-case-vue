<template>
  <div :class="$style.scheduleList">
    <Title bgColor="var(--color-green)">Results</Title>
    <template v-if="raceResults.length > 0">
      <div v-for="race in raceResults" :key="race.round" :class="$style.raceCard">
        <Title bgColor="var(--color-pink)" size="medium">
          {{ `${race.round}${getNumberSuffix(race.round, true)} Lap - ${race.distance}m` }}
        </Title>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Rank</TableHeader>
              <TableHeader>Name</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow v-for="(result, index) in race.results" :key="result.id">
              <TableData>{{ index + 1 }}</TableData>
              <TableData>{{ result.name }}</TableData>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </template>
    <p v-else :class="$style.noResults">No results available. Please complete a race.</p>
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
import { useRaceStore } from '@/stores/raceStore'
import { getNumberSuffix } from '@/utils/getNumberSuffix'

const raceStore = useRaceStore()

const raceResults = computed(() => raceStore.raceResults)
</script>

<style module lang="scss">
.scheduleList {
  height: 100%;
  width: 20rem;
  overflow-y: auto;
  border-left: 1px solid #ddd;
}

.noResults {
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
