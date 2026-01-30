<script setup lang="ts">
import GUILogo from "@/component/GUILogo.vue";

defineProps<{
  label: string;
}>();
</script>

<template>
  <div class="min-h-screen py-12 px-2 lg:px-8 bg-[#FDFDFD] flex flex-col justify-center">
    <div class="sm:(mx-auto w-full max-w-md) text-center">
      <GUILogo :large="true" />
    </div>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div
        class="bg-white py-10 px-8 sm:px-12 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100 rounded-3xl"
      >
        <slot />
      </div>
      <slot name="footer" />
    </div>
  </div>
</template>
