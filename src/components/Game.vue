<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div :class="$style.horseRaceGame">
    <h1 :class="$style.title">
      {{ currentRoundData && getLapText(currentRoundData.round, currentRoundData.distance) }}
    </h1>
    <template v-if="currentRoundData">
      <div :class="$style.raceTrack">
        <div :class="$style.lanes">
          <div
            v-for="(horse, index) in currentRoundData.participants"
            :key="horse.id"
            :class="$style.lane"
          >
            <div :class="$style.startingGate" :style="{ backgroundColor: horse.color }">
              {{ index + 1 }}
            </div>

            <div :class="$style.laneName">{{ horse.name }}</div>

            <div :class="$style.finishLine" :style="{ backgroundColor: horse.color }">
              <span :class="[$style.finishAreaText, { [$style.show]: !!horse.position }]">
                {{ `${horse.position}${getNumberSuffix(horse.position)}` }}
              </span>
            </div>

            <div
              :class="[
                $style.raceHorse,
                {
                  [$style.running]:
                    raceStatus === 'in_progress' &&
                    horse.traveledDistance < currentRoundData.distance,
                },
              ]"
              :style="{
                '--percent': `${(horse.traveledDistance / currentRoundData.distance) * 100}%`,
              }"
            >
              <HorseIcon :class="$style.raceHorseIcon" :style="{ fill: horse.color }" />
            </div>
          </div>
        </div>
      </div>
    </template>
    <p v-else :class="$style.noRace">No race in progress. Please Generate Program</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onUnmounted, watch } from 'vue'
import gameService from '@/services/game.service'
import { useRaceStore } from '@/stores/raceStore'
import { getNumberSuffix } from '@/utils/getNumberSuffix'
import HorseIcon from '@/assets/horse.svg?component'

const raceStore = useRaceStore()

const raceStatus = computed(() => raceStore.raceStatus)
const currentRoundData = computed(() => raceStore.currentRoundData)

const animationFrameRef = ref<number | null>(null)
const lastTimeRef = ref<number>(0)

const getLapText = (round: number, distance: number) => {
  return gameService.getLapText(round, distance)
}

const animate = (currentTime: number) => {
  const deltaTime = currentTime - lastTimeRef.value

  if (deltaTime >= 16.67) {
    raceStore.updateHorsePositions()
    lastTimeRef.value = currentTime
  }

  if (raceStatus.value === 'in_progress') {
    animationFrameRef.value = requestAnimationFrame(animate)
  }
}

const startAnimation = () => {
  if (raceStatus.value === 'in_progress') {
    lastTimeRef.value = performance.now()
    animationFrameRef.value = requestAnimationFrame(animate)
  }
}

const stopAnimation = () => {
  if (animationFrameRef.value) {
    cancelAnimationFrame(animationFrameRef.value)
    animationFrameRef.value = null
  }
}

watch(
  raceStatus,
  (newStatus) => {
    if (newStatus === 'in_progress') {
      startAnimation()
    } else {
      stopAnimation()
    }
  },
  { immediate: true },
)

onUnmounted(() => {
  stopAnimation()
})
</script>

<style module lang="scss">
.horseRaceGame {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  min-width: 15rem;
}

.title {
  text-align: center;
  margin: 0.5rem 0;
  font-size: 1.75rem;
  color: #222;
}

.raceTrack {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  background-color: var(--color-green);
  height: 60rem;
}

.lanes {
  flex: 1 1 auto;
  height: 100%;
}

.lane {
  position: relative;
  width: 100%;
  height: 6rem;
  border-top: 2px dashed var(--white);
  padding-right: 5rem;

  &:first-child {
    border-top: none;
  }
}

.startingGate {
  position: absolute;
  left: 0;
  width: 4rem;
  height: 100%;
  text-align: center;
  line-height: 6rem;
  font-weight: bold;
  font-size: 2rem;
  color: var(--white);
  z-index: 3;
  border: 2px solid var(--white);
  text-shadow: 1px 1px 2px var(--black);
}

.laneName {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
  font-size: 1.5rem;
  color: var(--white);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  z-index: 2;
  opacity: 0.7;
}

.finishLine {
  overflow: hidden;
  position: absolute;
  z-index: 0;
  right: 0;
  width: 6rem;
  height: 100%;
  text-align: center;
  line-height: 6rem;
  font-weight: bold;
  font-size: 2rem;
  color: var(--white);
  z-index: 3;
  border: 2px solid var(--white);
  text-shadow: 1px 1px 2px var(--black);

  & > .finishAreaText {
    display: inline-block;
    opacity: 0;

    &.show {
      opacity: 1;
      animation: fadeInOut 0.5s ease-in-out forwards;
    }
  }
}

.raceHorse {
  display: flex;
  width: 4rem;
  height: 4rem;
  position: relative;
  top: 50%;
  left: var(--percent);
  transform: translateY(-50%);
  z-index: 2;

  &.running {
    animation: gallop 0.5s ease-in-out alternate infinite;
  }
}

.raceHorseIcon {
  width: 4rem;
  height: 4rem;
  filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.2));
}

@keyframes gallop {
  0% {
    transform: translateY(-50%) rotate(0deg) scale(1);
  }
  25% {
    transform: translateY(-52%) rotate(-1deg) scale(1.02);
  }
  50% {
    transform: translateY(-48%) rotate(1deg) scale(0.98);
  }
  75% {
    transform: translateY(-52%) rotate(-0.5deg) scale(1.01);
  }
  100% {
    transform: translateY(-50%) rotate(0deg) scale(1);
  }
}

@keyframes fadeInOut {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(2);
  }

  100% {
    transform: scale(1);
  }
}

.noRace {
  text-align: center;
  font-size: 1.25rem;
  color: var(--color-text-secondary);
  margin-top: 2rem;
  font-weight: 500;
}
</style>
