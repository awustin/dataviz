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
        <!-- <h1>Inflación en Argentina</h1> -->
        <h2>bar chart</h2>
        <GraphControls />
        <Visualization />
    </div>
</template>

<style scoped>
.graph {
    display: flex;
    width: 100vw;
    flex-direction: column;
}
</style>