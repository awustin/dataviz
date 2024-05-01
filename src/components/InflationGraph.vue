<script setup>
import { ref, provide, onMounted, reactive } from 'vue';
import GraphControls from './GraphControls.vue';
import BarChart from './BarChart.vue';
import endpoints from '../endpoints.json';
import { formatPointsMonthlyVariation } from '../utils';

const dataIndex = ref(0);
const ipcGeneral = reactive({ ready: false });

provide('dataIndex', dataIndex);
provide('ipcGeneral', ipcGeneral);

onMounted(async () => {
    const { url } = endpoints.ipcVarGeneral;
    const { data = [] } = await fetch(url).then(resp => resp.json());

    ipcGeneral.points = formatPointsMonthlyVariation(data);
    ipcGeneral.count = data.length;
    ipcGeneral.ready = true;
});
</script>

<template>
    <div class='graph'>
        <h1 class='graph__header'>Variación mensual del IPC [%]</h1>
        <div class='graph__vis'>
            <BarChart v-if="ipcGeneral.ready" />
            <h3 class='graph__loading' v-else>...</h3>
        </div>
        <GraphControls />
        <div class="disclaimer">En base a datos del INDEC</div>
    </div>
</template>

<style scoped>
.graph {
    display: flex;
    width: 100vw;
    flex-direction: column;
}

.graph__header {
    padding-inline: 30px;
    font-size: 30px;
}

.graph__vis{
    padding-top: 1%;
    display: flex;
    justify-content: space-evenly;
    flex-flow: column;
    align-items: center;
}

.disclaimer {
    font-style: italic;
    font-size: x-small;
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