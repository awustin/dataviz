<script setup>
import { ref, inject, watch } from 'vue';
import { useBarsDiagram } from '../composables/useBarsDiagram';
import { useScreenSizeBreakpoint } from '../composables/useScreenSizeBreakpoint';
import { formatData } from '../utils';

const dataIndex = inject('dataIndex');
const data = inject('data', []);
const graph = ref(null);
const isSmall = useScreenSizeBreakpoint();

const { onDataIndex, onResize } = useBarsDiagram({
    data: formatData(data),
    node: graph,
});

watch(dataIndex, dataIndex => onDataIndex(dataIndex));
watch(isSmall, isSmall => onResize(isSmall));
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
