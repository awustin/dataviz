<script setup>
import { ref, inject, watch } from 'vue';
import { useBarsDiagram } from '../composables/useBarsDiagram';
import { formatData } from '../utils';

const dateCurrent = inject('dateCurrent');
const data = inject('data', []);
const graph = ref(null);

const { update } = useBarsDiagram({
    data: formatData(data),
    node: graph,
});

watch(dateCurrent, v => update(v));
</script>

<template>
    <div ref='graph' class='graph__vis' />
    {{  dateCurrent }}
</template>

<style scoped>
.graph__vis {
    border: 1px dashed black;
    padding: 1em;
}
</style>
