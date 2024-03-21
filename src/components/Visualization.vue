<script setup>
import BarChart from './BarChart.vue';
import ItemsPrice from './ItemsPrice.vue';
</script>

<template>
    <div class='graph__vis'>
        <BarChart />
        <ItemsPrice />
    </div>
</template>

<style scoped>
.graph__vis{
    padding-top: 1%;
    display: grid;
}

@media screen and (max-width: 600px) {
    .graph__vis{
        grid-template:
            "chart chart" 4fr
            "food utilities" 1fr;
    }
}

@media screen and (min-width: 600px) and (max-width: 1200px) {
    .graph__vis {
        grid-template:
            "chart chart" 3fr
            "food utilities" 1fr / 1fr 1fr;
    }
}

@media screen and (min-width: 1200px) {
  .graph__vis {
        grid-template:
            "food chart" 1fr
            "utilities chart" 1fr / 1fr 2fr;
  }
}
</style>
