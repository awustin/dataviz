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

.bars rect {
    fill: rgb(255, 135, 75);
}

.ruler__label {
    font-family: monospace;
    text-anchor: middle;
    font-size: 1.4em;
}

.ruler__tag {
    height: 1.5em;
    width: 70px;
    border-radius: 10%;
    background-color: rgb(83, 104, 197);
    color: white;
    font-family: monospace;
    font-weight: bold;
}

@media screen and (max-width: 600px) {
    .yAxis text{
        font-size: 1.5em;
    }

    .xAxis text{
        font-size: 1.9em;
    }

    .ruler__label {
        font-size: 2.7em;
    }

    .ruler__tag {
        height: 1.5em;
        width: 70px;
        border-radius: 10%;
        background-color: rgb(83, 104, 197);
        color: white;
        font-family: monospace;
        font-weight: bold;
    }
}

@media screen and (min-width: 600px) {
}
</style>
