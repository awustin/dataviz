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

<style scoped>
.graph__vis {
    border: 1px dashed black;
    padding: 1em;
}
</style>
