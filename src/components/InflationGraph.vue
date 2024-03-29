<script setup>
import { ref, provide, onMounted, reactive } from 'vue';
import GraphControls from './GraphControls.vue';
import BarChart from './BarChart.vue';
import ItemsPrice from './ItemsPrice.vue';
import endpoints from '../endpoints.json';

const dataIndex = ref(0);
const ipcGeneral = reactive({ ready: false });
const ipcItems = reactive({ ready: false });

provide('dataIndex', dataIndex);
provide('ipcGeneral', ipcGeneral);
provide('ipcItems', ipcItems);

onMounted(async () => {
    const { url } = endpoints.ipcVarGeneral;
    const { data = [] } = await fetch(url).then(resp => resp.json());

    ipcGeneral.points = data;
    ipcGeneral.count = data.length;
    ipcGeneral.ready = true;
});

onMounted(async () => {
    const { url } = endpoints.ipcIndice;
    const { data = [] } = await fetch(url).then(resp => resp.json());
    const {
        indiceAlimentos,
        indiceServicios,
    } = data.reduce((acc, datum, index) => {
        const [, iAlimentos, iServicios] = datum;

        acc.indiceAlimentos.push(iAlimentos);
        acc.indiceServicios.push(iServicios);

        return acc;
    }, {
        indiceAlimentos: [],
        indiceServicios: [],
    });

    ipcItems.indiceAlimentos = indiceAlimentos;
    ipcItems.indiceServicios = indiceServicios;
    // ipcItems.count = data.length;
    ipcItems.ready = true;
});

</script>

<template>
    <div class='graph'>
        <h1 class='graph__header'>Variación (%) mensual del IPC</h1>
        <div class='graph__vis'>
            <BarChart v-if="ipcGeneral.ready" />
            <h3 class='graph__loading' v-else>...</h3>
            <ItemsPrice v-if="false" />
        </div>
        <GraphControls />
        <p>En base a datos del INDEC</p>
    </div>
</template>

<style scoped>
.graph {
    display: flex;
    width: 100vw;
    flex-direction: column;
}

.graph__header {
    font-size: 30px;
}

.graph__vis{
    padding-top: 1%;
    display: flex;
    justify-content: space-evenly;
}

/* Two breakpoints (3 screen levels): 600px - 800px*/

@media screen and (max-width: 600px) {
    .graph__vis{
        grid-template:
            "chart chart" 4fr
            "food utilities" 1fr;
    }
}

@media screen and (min-width: 600px) and (max-width: 1200px) {
    .graph__vis {
        grid-template:
            "chart chart" 3fr
            "food utilities" 1fr / 1fr 1fr;
    }
}

@media screen and (min-width: 1200px) {
    .graph__vis {
        grid-template:
            "food chart" 1fr
            "utilities chart" 1fr / 1fr 2fr;
    }
}
</style>