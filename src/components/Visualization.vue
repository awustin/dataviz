<script setup>
import { inject } from 'vue';

const year = inject('year', null);
</script>

<template>
    <div class='graph__vis'>
        {{ year }}
    </div>
</template>

<style scoped>
.graph__vis {
    border: 1px dashed black;
    padding: 1em;
}
</style>
