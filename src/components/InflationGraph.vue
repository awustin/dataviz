<script setup>
import { ref, provide } from 'vue';
import GraphControls from './GraphControls.vue';
import Visualization from './Visualization.vue';

const year = ref('2000');

provide('year', year);
</script>

<template>
    <div class='graph-container'>
        <h1>Inflación en Argentina</h1>
        <Visualization />
        <GraphControls />
    </div>
</template>

<style scoped>
.graph-container {
    display: flex;
    width: 80vw;
    border: 1px dashed black;
    flex-direction: column;
}
</style>