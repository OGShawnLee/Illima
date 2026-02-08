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
      class="ml-1 block text-[10px] uppercase tracking-[0.25em] font-bold text-gray-400 dark:text-gray-500 transition-colors"
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
      class="w-full p-4 block rounded-xl border transition-all duration-300 outline-none bg-gray-50 border-gray-100 text-gray-700 placeholder-gray-300 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/5 dark:bg-white/[0.03] dark:border-white/10 dark:text-white dark:placeholder-gray-700 dark:focus:bg-white/[0.07] dark:focus:border-indigo-500/50 dark:focus:ring-indigo-500/10"
    />
  </div>
</template>
