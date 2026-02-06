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
  <aside class="w-72 border-r border-gray-100 bg-[#FAFAFA] flex flex-col h-full shrink-0">
    <div class="p-8 overflow-y-auto flex-1 custom-scrollbar">
      <GUILogo class="mb-10" />
      <nav>
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">Documents</h2>
          <button
            class="bg-transparent text-gray-400 hover:text-black transition-colors"
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
            <RouterLink :to="'/home/' + document.id_document" v-slot="{ isActive }" class="w-full">
              <div
                :class="[
                  'relative flex items-center py-2.5 px-4 rounded-r-xl transition-all duration-300 ease-out',
                  isActive
                    ? 'bg-gray-100/50 text-gray-900'
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50',
                ]"
              >
                <div
                  :class="[
                    'absolute left-0 w-1 bg-gray-900 transition-all duration-500 ease-in-out rounded-r-full',
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
    <div class="p-4 border-t border-gray-100 bg-white/50 backdrop-blur-sm shrink-0">
      <div class="flex items-center justify-between gap-3 px-2 py-2 rounded-xl group">
        <div class="flex items-center gap-3 overflow-hidden">
          <div
            class="w-9 h-9 rounded-full bg-indigo-50 flex items-center justify-center border border-indigo-100 shrink-0"
          >
            <span class="font-bold text-indigo-400 uppercase">
              {{ fullName?.charAt(0) || "?" }}
            </span>
          </div>

          <div class="flex flex-col overflow-hidden">
            <span class="text-sm font-bold text-gray-700 truncate">
              {{ fullName || "Loading..." }}
            </span>
            <span class="text-xs text-gray-400 tracking-tighter truncate">
              {{ profile?.email }}
            </span>
          </div>
        </div>
        <button
          @click="handleSignOut"
          class="opacity-0 group-hover:opacity-100 p-1.5 hover:text-red-500 text-gray-400 transition-all"
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
