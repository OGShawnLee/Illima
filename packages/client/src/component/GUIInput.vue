<script setup lang="ts">
defineProps<{
  label: string;
  modelValue: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  id: string;
}>();
defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="w-full grid gap-2">
    <label
      :for="id"
      class="ml-1 block text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500"
    >
      {{ label }}
    </label>
    <input
      :id="id"
      :type="type || 'text'"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :placeholder="placeholder"
      :required="required"
      class="w-full p-4 block bg-gray-50 rounded-xl border-gray-200 focus:(bg-white ring-4 ring-indigo-500/10 border-indigo-400) transition-all duration-300 text-gray-700 placeholder-gray-300"
    />
  </div>
</template>
