<script setup>
import { inject } from 'vue';

const dataIndex = inject('dataIndex');
const data = inject('data', []);
</script>

<template>
    <div class='graph__controls'>
        {{ dataIndex }}
        <input
            class='dateInput'
            type='range'
            :min='0'
            :max='data.length - 1'
            v-model='dataIndex'
        >
    </div>
</template>

<style scoped>
.dateInput {
    width: 100%;
}
</style>
