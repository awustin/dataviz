<script setup>
import { ref, provide } from 'vue';
import GraphControls from './GraphControls.vue';
import Visualization from './Visualization.vue';
import dataJson from '../data.json';

const dataIndex = ref(0);

provide('dataIndex', dataIndex);
provide('data', dataJson);
</script>

<template>
    <div class='graph'>
        <h1>Variación (%) acumulada del IPC</h1>
        <Visualization />
        <GraphControls />
        <div>En base a datos del INDEC</div>
    </div>
</template>

<style scoped>
.graph {
    display: flex;
    width: 100vw;
    flex-direction: column;
}
</style>