<script setup>
import { computed, inject } from 'vue';

const MIN_YEAR = '2000';
const MAX_YEAR = '2023';
const year = inject('year', null);
const nextYearDisabled = computed(() => Number(year.value) === Number(MAX_YEAR));
const prevYearDisabled = computed(() => Number(year.value) === Number(MIN_YEAR));
</script>

<template>
    <div class='graph__button'>
        <button @click='year--' :disabled='prevYearDisabled'>{{ '<<' }}</button>
        <button @click='year++' :disabled='nextYearDisabled'>{{ '>>' }}</button>
    </div>
</template>
