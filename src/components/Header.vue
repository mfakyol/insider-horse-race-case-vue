<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <header :class="$style.header">
    <h1 :class="$style.title">Horse Racing</h1>
    <div :class="$style.buttons">
      <Button variant="primary" @click="raceStore.initializeRaceSchedule">
        Generate Program
      </Button>
      <Button variant="success" @click="handleStartRace" :disabled="startButtonDisabled">
        {{ startButtonText }}
      </Button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Button from '../components/ui/Button.vue'
import { useRaceStore } from '@/stores/raceStore'

const raceStore = useRaceStore()

const currentRound = computed(() => raceStore.currentRound)

const isLastRound = computed(() => raceStore.currentRound === raceStore.raceSchedule.length - 1)

const raceStatus = computed(() => raceStore.raceStatus)

const handleStartRace = () => {
  const currentStatus = raceStore.raceStatus

  if (currentStatus === 'not_started' || currentStatus === 'paused') {
    raceStore.updateRaceStatus('in_progress')
  } else if (currentStatus === 'in_progress') {
    raceStore.updateRaceStatus('paused')
  } else if (currentStatus === 'finished') {
    raceStore.startNextRound()
    raceStore.updateRaceStatus('in_progress')
  }
}

const startButtonAttrs = computed(() =>
  getStartButtonAttr(raceStatus.value, currentRound.value, isLastRound.value),
)

const startButtonText = computed(() => startButtonAttrs.value.text)
const startButtonDisabled = computed(() => startButtonAttrs.value.disabled)

const getStartButtonAttr = (raceStatus: string, round: number, isLastRound: boolean) => {
  let text = ''

  if (raceStatus === 'in_progress') {
    text = 'Pause Race'
  } else if (raceStatus === 'paused') {
    text = 'Resume Race'
  } else if (raceStatus === 'finished') {
    text = round === 3 ? 'Restart Race' : 'Next Round'
  } else {
    text = 'Start Race'
  }

  const disabled = raceStatus === 'not_initiated' || (raceStatus === 'finished' && isLastRound)

  return { text, disabled }
}
</script>

<style module lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.buttons {
  display: flex;
  gap: 1rem;
}
</style>
