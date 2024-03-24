<script setup>
import { inject } from 'vue';

const dataIndex = inject('dataIndex');
const ipcGeneral = inject('ipcGeneral', { count: 0 });
</script>

<template>
    <div class='graph__controls'>
        <input v-if="ipcGeneral.count"
            class='dateInput'
            type='range'
            :min='0'
            :max='ipcGeneral.count - 1'
            v-model='dataIndex'
        >
        <div v-else>...</div>
    </div>
</template>

<style scoped>
@media screen and (max-width: 600px) {
  .dateInput {
    width: 100%;
  }
}

@media screen and (min-width: 600px) {
  .dateInput {
    width: 50%;
  }
}
</style>
