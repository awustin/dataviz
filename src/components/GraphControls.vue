<script setup>
import { inject } from 'vue';

const dataIndex = inject('dataIndex');
const ipcGeneral = inject('ipcGeneral', { count: 0 });
</script>

<template>
    <div class='graph__controls'>
        <input v-if="ipcGeneral.count"
          class='customSlider'
          type='range'
          :min='0'
          :max='ipcGeneral.count - 1'
          v-model='dataIndex'
        >
        <div v-else>...</div>
    </div>
</template>

<style scoped>
.customSlider {
  appearance: none;
  overflow: hidden;
}

.customSlider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    height: 15px;
    width: 15px;
    background-color: rgb(122, 141, 226);
    box-shadow: -480px 0 0 480px rgb(122, 141, 226);
}

@media screen and (max-width: 600px) {
  .customSlider {
    width: 100%;
    margin-block: 20px;
    height: 30px;
  }
}

@media screen and (min-width: 600px) {
  .customSlider {
    width: 50%;
  }
}
</style>
