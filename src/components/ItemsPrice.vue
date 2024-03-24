<script setup>
import { inject, ref, watch } from 'vue';
import { getTotalValuesFromIndex } from '../utils';

const dataIndex = inject('dataIndex');
const ipcItems = inject('ipcItems', { ready: false });
const precioAlimentos = ref([]);
const precioServicios = ref([]);

watch(
    () => ipcItems.ready,
    ready => {
        if (ready) {
            precioAlimentos.value = getTotalValuesFromIndex(20, ipcItems.indiceAlimentos);
            precioServicios.value = getTotalValuesFromIndex(200, ipcItems.indiceServicios);
        }
    }
);
</script>

<template>
    <div class='food' v-if="ipcItems.ready">
        <img class='food__img' src='../assets/food.svg'>
        <div class='food__price'>$ {{ Number(precioAlimentos[dataIndex]).toFixed(1) }}</div>
    </div>
    <div class='utilities' v-if="ipcItems.ready">
        <img class='utilities__img' src='../assets/utilities.svg'>
        <div class='utilities__price'>$ {{ Number(precioServicios[dataIndex]).toFixed(1) }}</div>
    </div>
</template>

<style scoped>


@media screen and (max-width: 600px) {
    .food {
    grid-area: food;
    }
    .utilities {
        grid-area: utilities;
    }
    img {
        width: 100px;
    }
}

@media screen and (min-width: 600px) and (max-width: 1200px) {
    .food {
    grid-area: food;
    }
    .utilities {
        grid-area: utilities;
    }
    img {
        width: 100px;
    }
}

@media screen and (min-width: 1200px) {
    .food {
    grid-area: food;
    }
    .utilities {
        grid-area: utilities;
    }
    img {
        width: 200px;
    }
}
</style>