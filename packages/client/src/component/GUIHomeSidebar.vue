<script setup lang="ts">
import type { DocumentSchema, ProfileSchema } from "shared";
import GUILogo from "@/component/GUILogo.vue";
import router from "@/router";
import { PlusCircle } from "lucide-vue-next";
import { computed } from "vue";
import { AUTH_TOKEN_NAME } from "@/env";

const props = defineProps<{
  documentCollection: DocumentSchema.DocumentShape[];
  profile: ProfileSchema.ProfileShape | undefined;
}>();
defineEmits(["onCreateDocument"]);

const fullName = computed(() =>
  props.profile ? props.profile.name + " " + props.profile.last_name : undefined,
);

function handleSignOut() {
  localStorage.removeItem(AUTH_TOKEN_NAME);
  router.push("/auth/sign-in");
}
</script>

<template>
  <aside
    class="w-72 flex flex-col h-full shrink-0 transition-colors duration-300 bg-[#FAFAFA] border-r border-gray-100 dark:bg-[#0F0F0F] dark:border-white/5"
  >
    <div class="p-8 overflow-y-auto flex-1 custom-scrollbar">
      <GUILogo class="mb-10 dark:invert-[0.9]" />
      <nav>
        <div class="flex items-center justify-between mb-6">
          <h2
            class="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 dark:text-gray-500"
          >
            Documents
          </h2>
          <button
            class="bg-transparent text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            @click="$emit('onCreateDocument')"
            title="Create New Document"
          >
            <PlusCircle :size="18" />
          </button>
        </div>
        <ul class="space-y-1">
          <li
            v-for="document in documentCollection"
            :key="document.id_document"
            class="relative flex items-center group"
          >
            <RouterLink
              :to="'/studio/' + document.id_document"
              v-slot="{ isActive }"
              class="w-full"
            >
              <div
                :class="[
                  'relative flex items-center py-2.5 px-4 rounded-r-xl transition-all duration-300 ease-out',
                  isActive
                    ? 'bg-gray-100/50 text-gray-900 dark:bg-white/5 dark:text-white'
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50 dark:text-gray-500 dark:hover:text-gray-300 dark:hover:bg-white/[0.02]',
                ]"
              >
                <div
                  :class="[
                    'absolute left-0 w-1 transition-all duration-500 ease-in-out rounded-r-full',
                    'bg-gray-900 dark:bg-white',
                    isActive
                      ? 'h-3/5 opacity-100'
                      : 'h-0 opacity-0 group-hover:h-1/4 group-hover:opacity-20',
                  ]"
                />
                <span class="text-[10px] uppercase tracking-[0.2em] font-bold">
                  {{ document.title }}
                </span>
              </div>
            </RouterLink>
          </li>
        </ul>
      </nav>
    </div>
    <div
      class="p-4 border-t shrink-0 transition-colors duration-300 border-gray-100 bg-white/50 backdrop-blur-sm dark:border-white/5 dark:bg-black/20"
    >
      <div class="flex items-center justify-between gap-3 px-2 py-2 rounded-xl group">
        <div class="flex items-center gap-3 overflow-hidden">
          <div
            class="w-9 h-9 rounded-full flex items-center justify-center border shrink-0 bg-indigo-50 border-indigo-100 dark:bg-indigo-500/10 dark:border-indigo-500/20"
          >
            <span class="font-bold text-indigo-400 dark:text-indigo-300 uppercase">
              {{ fullName?.charAt(0) || "?" }}
            </span>
          </div>
          <div class="flex flex-col overflow-hidden">
            <span class="text-sm font-bold truncate text-gray-700 dark:text-gray-200">
              {{ fullName || "Loading..." }}
            </span>
            <span class="text-xs tracking-tighter truncate text-gray-400 dark:text-gray-500">
              {{ profile?.email }}
            </span>
          </div>
        </div>
        <button
          @click="handleSignOut"
          class="opacity-0 group-hover:opacity-100 p-1.5 transition-all text-gray-400 hover:text-red-500 dark:text-gray-600 dark:hover:text-red-400"
          title="Sign Out"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </button>
      </div>
    </div>
  </aside>
</template>
