<script setup>
import { inject } from 'vue';

const dataIndex = inject('dataIndex');
const data = inject('data', []);
</script>

<template>
    <div class='graph__controls'>
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
