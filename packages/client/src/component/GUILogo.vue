<script setup lang="ts">
const props = defineProps<{ large?: boolean }>();
</script>

<template>
  <h1
    v-if="props.large"
    class="uppercase text-4xl font-light tracking-[0.5em] transition-colors duration-300 text-gray-800 dark:text-white"
  >
    Illima
  </h1>
  <h1
    v-else
    class="uppercase text-xl font-medium tracking-[0.4em] transition-colors duration-300 text-gray-900 dark:text-gray-100"
  >
    Illima
  </h1>
</template>

<style scoped>
/* Satoshi looks best with a very slight text-shadow 
  to prevent 'thinning' on high-res dark screens 
*/
h1 {
  font-family: "Satoshi", sans-serif;
  /* This prevents the font from looking too jagged when thin */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
