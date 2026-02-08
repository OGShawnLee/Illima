<script setup lang="ts">
const props = defineProps<{
  isActive?: boolean;
  title: string;
}>();

defineEmits(["click"]);
</script>

<template>
  <button
    class="w-9 h-9 flex items-center justify-center rounded-md transition-all duration-200 shrink-0 group"
    :class="[
      props.isActive
        ? 'bg-gray-900 text-white dark:bg-white dark:text-black shadow-sm scale-95'
        : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-gray-200',
    ]"
    type="button"
    :title="props.title"
    @click="$emit('click', $event)"
  >
    <div class="scale-75 transition-transform group-hover:scale-90">
      <slot />
    </div>
  </button>
</template>
