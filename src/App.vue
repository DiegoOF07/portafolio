<script setup lang="ts">
import Navbar from './components/Navbar.vue'
</script>

<template>
  <div id="app">
    <Navbar />
    <RouterView />
  </div>
</template>

<style scoped>
#app{
  width: 100dvw;
  height: 100dvh;
}

@media (max-width: 895px) {
  #app{
    width: 98dvw;
    height: 100dvh;
  }
}
</style>
