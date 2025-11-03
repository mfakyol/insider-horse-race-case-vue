<script setup lang="ts">
import Game from './components/Game.vue'
import Header from './components/Header.vue'
import HorseList from './components/HorseList.vue'
import ResultList from './components/ResultList.vue'
import ScheduleList from './components/ScheduleList.vue'
</script>

<template>
  <Header />
  <main :class="$style.main">
    <HorseList />
    <Game />
    <ScheduleList />
    <ResultList />
  </main>
</template>

<style module lang="scss">
.gameView {
  height: 100vh;
}

.main {
  display: flex;
  height: calc(100vh - var(--header-height));
}
</style>
