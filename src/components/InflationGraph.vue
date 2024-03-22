<script setup>
import { ref, provide, onMounted, reactive } from 'vue';
import GraphControls from './GraphControls.vue';
import Visualization from './Visualization.vue';
import endpoints from '../endpoints.json';

const dataIndex = ref(0);
const ipcGeneral = reactive({ ready: false });

provide('dataIndex', dataIndex);
provide('ipcGeneral', ipcGeneral);

onMounted(async () => {
    const { url } = endpoints.ipc;
    const { data = [], count = 0 } = await fetch(url).then(resp => resp.json());

    ipcGeneral.ready = true;
    ipcGeneral.points = data;
    ipcGeneral.count = count;
});

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