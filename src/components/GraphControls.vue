<script setup>
import { watch, inject } from 'vue';

const dateMin = 2017;
const dateMax = 2023;
const dateCurrent = inject('dateCurrent');

</script>

<template>
    <div class='graph__controls'>
        <input
            id='dateInput'
            type='range'
            :min='dateMin'
            :max='dateMax'
            v-model='dateCurrent'
        >
    </div>
</template>

<style scoped>
#dateInput {
    width: 100%;
}
</style>
