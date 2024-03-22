<script setup>
import { ref, inject, watch } from 'vue';
import { useBarChartTwoSizes } from '../composables/useBarChartTwoSizes';
import { useScreenSizeBreakpoint } from '../composables/useScreenSizeBreakpoint';
import { formatPointsMonthlyVariation } from '../utils';

const dataIndex = inject('dataIndex');
const ipcGeneral = inject('ipcGeneral', { points: [] });
const graph = ref(null);

const isSmall = useScreenSizeBreakpoint();
const { onDataIndex, onResize } = useBarChartTwoSizes({
    data: formatPointsMonthlyVariation(ipcGeneral.points),
    node: graph,
    isSmall: isSmall.value,
});

watch(dataIndex, onDataIndex);
watch(isSmall, onResize);
</script>

<template>
    <div ref='graph' class='bar-chart'/>
</template>

<style>
.bar-chart {
    grid-area: chart;
}

@media screen and (max-width: 600px) {
    .yAxis text{
        font-size: 2.7em;
    }

    .xAxis text{
        font-size: 2.7em;
    }

    .ruler__text {
    text-anchor: middle;
    font-size: 3em;
    }
}

@media screen and (min-width: 600px) {
  .ruler__text {
    text-anchor: middle;
    font-size: 1.2em;
  }
}
</style>
