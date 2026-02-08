<script setup lang="ts">
import GUILogo from "@/component/GUILogo.vue";

defineProps<{
  label: string;
}>();
</script>

<template>
  <div
    class="min-h-screen py-12 px-2 lg:px-8 flex flex-col justify-center transition-colors duration-500 bg-[#FDFDFD] dark:bg-[#0A0A0A]"
  >
    <div class="sm:(mx-auto w-full max-w-md) text-center mb-10">
      <GUILogo :large="true" />
    </div>

    <div class="sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div
        class="transition-all duration-300 py-10 px-8 sm:px-12 rounded-3xl border bg-white border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] dark:bg-[#111111] dark:border-white/5 dark:shadow-none"
      >
        <div class="space-y-6">
          <slot />
        </div>
      </div>
      <div class="mt-8">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>
