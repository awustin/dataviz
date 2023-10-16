<script setup>
import { inject, computed } from 'vue';

const dataIndex = inject('dataIndex');
const data = inject('data', []);
const foodPrice = computed(() => {
    const foodVar = Number(data[Number(dataIndex.value)].variationFoodAcc);

    return (100 * ((foodVar/100) + 1)).toFixed(1);
});
const utilitiesPrice = computed(() => {
    const utilitiesVar = Number(data[Number(dataIndex.value)].variationServicesAcc);

    return (100 * ((utilitiesVar/100) + 1)).toFixed(1);
});

</script>

<template>
    <div class='food'>
        <img class='food__img' src='../assets/food.svg'>
        <div class='food__price'>$ {{ foodPrice }}</div>
    </div>
    <div class='utilities'>
        <img class='utilities__img' src='../assets/utilities.svg'>
        <div class='utilities__price'>$ {{ utilitiesPrice }}</div>
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