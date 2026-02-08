<script setup lang="ts">
import { useDark } from "@vueuse/core";

useDark();
</script>

<template>
  <RouterView v-slot="{ Component }">
    <Transition name="fade">
      <Component :is="Component" />
    </Transition>
  </RouterView>
</template>
