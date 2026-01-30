<script setup lang="ts">
const props = defineProps<{ large?: boolean }>();
</script>

<template>
  <h1 v-if="props.large" class="uppercase text-4xl font-extralight tracking-widest text-gray-800">
    Illima
  </h1>
  <h1 v-else class="uppercase text-xl font-light tracking-[0.3em] text-gray-900">Illima</h1>
</template>
