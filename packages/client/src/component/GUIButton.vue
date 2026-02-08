<script setup lang="ts">
defineProps<{
  loading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit";
  loadingLabel?: string;
}>();
</script>

<template>
  <button
    :type="type || 'button'"
    :disabled="disabled || loading"
    class="w-full flex justify-center items-center py-4 px-4 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group bg-gray-900 text-white hover:bg-black shadow-lg shadow-gray-200 dark:bg-white dark:text-black dark:hover:bg-gray-100 dark:shadow-none"
  >
    <template v-if="loading">
      <svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <span class="antialiased">
        {{ loadingLabel ?? "Loading..." }}
      </span>
    </template>

    <span v-else class="flex items-center gap-2 antialiased">
      <slot />
    </span>
  </button>
</template>
