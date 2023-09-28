<script setup>
import { ref, inject } from 'vue';
import { useBarsDiagram } from '../composables/useBarsDiagram';

const year = inject('year', null);
const graph = ref(null);

useBarsDiagram(graph);

</script>

<template>
    <div ref='graph' class='graph__vis'></div>
    {{ year }}
</template>

<style scoped>
.graph__vis {
    border: 1px dashed black;
    padding: 1em;
}
</style>
