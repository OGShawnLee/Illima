<script setup lang="ts">
const props = defineProps<{
  isActive?: boolean;
  title: string;
}>();

defineEmits(["click"]);
</script>

<template>
  <button
    class="w-10 h-10 flex items-center justify-center rounded transition-colors shrink-0"
    :class="props.isActive ? 'text-white bg-gray-700' : 'text-gray-400 hover:bg-gray-800'"
    type="button"
    :title="props.title"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>
