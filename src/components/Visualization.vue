<script setup>
import { ref, inject, watch } from 'vue';
import { useBarChartTwoSizes } from '../composables/useBarChartTwoSizes';
import { useScreenSizeBreakpoint } from '../composables/useScreenSizeBreakpoint';
import { formatData } from '../utils';

const dataIndex = inject('dataIndex');
const data = inject('data', []);
const graph = ref(null);

const isSmall = useScreenSizeBreakpoint();
const { onDataIndex, onResize } = useBarChartTwoSizes({
    data: formatData(data),
    node: graph,
    isSmall: isSmall.value,
});

watch(dataIndex, onDataIndex);
watch(isSmall, onResize);
</script>

<template>
    <div ref='graph' class='graph__vis' />
</template>

<style>
@media screen and (max-width: 600px) {
    .yAxis text{
        font-size: 2.5em;
    }

    .xAxis text{
        font-size: 2.5em;
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
