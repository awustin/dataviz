<script setup>
import { ref, inject, watch } from 'vue';
import { useBarChartTwoSizes } from '../composables/useBarChartTwoSizes';
import { useScreenSizeBreakpoint } from '../composables/useScreenSizeBreakpoint';

const dataIndex = inject('dataIndex');
const ipcGeneral = inject('ipcGeneral', { points: [] });
const graph = ref(null);
const xLabel = ref(`${ipcGeneral.points[dataIndex.value].monthShort} ${ipcGeneral.points[dataIndex.value].year}`);

const isSmall = useScreenSizeBreakpoint();
const { onDataIndex, onResize } = useBarChartTwoSizes({
    data: ipcGeneral.points,
    node: graph,
    isSmall: isSmall.value,
});

watch(dataIndex, value => {
    xLabel.value = `${ipcGeneral.points[dataIndex.value].monthShort} ${ipcGeneral.points[dataIndex.value].year}`;
    onDataIndex(value);
});
watch(isSmall, onResize);
</script>

<template>
    <div class='x-label'>{{ xLabel }}</div>
    <div ref='graph' class='bar-chart'/>
</template>

<style>
.x-label {
    width: fit-content;
    padding: 5px;
    border-radius: 10%;
    font-weight: 600;
    color: #666666;
    font-stretch: extra-condensed;
    font-family: 'Francois One';
    font-size: 1.3em;
}

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
