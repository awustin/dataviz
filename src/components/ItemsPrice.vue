<script setup>
import { inject, ref, watch } from 'vue';

const dataIndex = inject('dataIndex');
const ipcGeneral = inject('ipcGeneral', { data: 0 });
const foodPrice = ref(33);
const utilitiesPrice = ref(100);

watch(dataIndex, i => foodPrice.value *= Number(ipcGeneral.points[i][1]) + 1);
watch(dataIndex, i => utilitiesPrice.value *= Number(ipcGeneral.points[i][1]) + 1);

</script>

<template>
    <div class='food'>
        <img class='food__img' src='../assets/food.svg'>
        <div class='food__price'>$ {{ foodPrice.toFixed(1) }}</div>
    </div>
    <div class='utilities'>
        <img class='utilities__img' src='../assets/utilities.svg'>
        <div class='utilities__price'>$ {{ utilitiesPrice.toFixed(1) }}</div>
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