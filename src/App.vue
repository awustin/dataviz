<script setup>
import InflationGraph from './components/InflationGraph.vue'
</script>

<template>
  <InflationGraph />
</template>

<style>
#app {
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  background-color: antiquewhite;
  display: flex;
  justify-content: center;
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
}
</style>
