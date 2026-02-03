<script setup lang="ts">
import GUILogo from "@/component/GUILogo.vue";
import router from "@/router";
import { API_BASE_URL, AUTH_TOKEN_NAME } from "@/env";
import { computed, onMounted, ref } from "vue";
import { ProfileSchema } from "shared";

const profile = ref<ProfileSchema.ProfileShape>();
const fullName = computed(() =>
  profile.value ? profile.value.name + " " + profile.value.last_name : undefined,
);

onMounted(async () => {
  const token = localStorage.getItem(AUTH_TOKEN_NAME);

  if (token == null) {
    router.push("/auth/sign-in");
    return;
  }

  try {
    const response = await fetch(API_BASE_URL + "/api/profile", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    profile.value = await response.json();
  } catch (e) {
    router.push("/auth/sign-in");
  }
});

function handleSignOut() {
  localStorage.removeItem(AUTH_TOKEN_NAME);
  router.push("/auth/sign-in");
}

const isContextOpen = ref(false);
const activeDoc = ref("The Modern Thesis");

const collections = ref([
  {
    name: "Academic Work",
    documents: ["The Modern Thesis", "Lecture Notes: Ethics", "Research Summary"],
  },
  {
    name: "Personal Projects",
    documents: ["Morning Journal", "Drafting: Chapter One"],
  },
]);

const handleAddCollection = () => {
  const name = prompt("Collection Name:");
  if (name) collections.value.push({ name, documents: [] });
};

const handleAddDoc = (collectionName: string) => {
  const title = prompt("Document Title:");
  const collection = collections.value.find((c) => c.name === collectionName);
  if (title && collection) {
    collection.documents.push(title);
    activeDoc.value = title;
  }
};
</script>

<template>
  <div class="min-h-screen bg-[#FDFDFD] flex overflow-hidden">
    <aside
      class="w-72 border-r border-gray-100 bg-[#FAFAFA] flex flex-col h-screen sticky top-0 shrink-0"
    >
      <div class="p-8 overflow-y-auto flex-1 custom-scrollbar">
        <GUILogo class="mb-10" />

        <nav>
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">Library</h2>
            <button
              @click="handleAddCollection"
              class="bg-transparent text-gray-400 hover:text-black text-xs"
            >
              +
            </button>
          </div>

          <div v-for="collection in collections" :key="collection.name" class="mb-8">
            <div class="flex items-center justify-between mb-3 px-2 group">
              <span class="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">
                {{ collection.name }}
              </span>
              <button
                @click="handleAddDoc(collection.name)"
                class="bg-transparent opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-indigo-500"
              >
                +
              </button>
            </div>

            <ul class="space-y-3">
              <li
                v-for="doc in collection.documents"
                :key="doc"
                @click="activeDoc = doc"
                class="group relative flex items-center cursor-pointer transition-all duration-300 px-2 py-1"
              >
                <div
                  class="absolute left-0 w-[1px] bg-gray-900 transition-all duration-500"
                  :class="
                    activeDoc === doc
                      ? 'h-full opacity-100'
                      : 'h-0 opacity-0 group-hover:h-1/2 group-hover:opacity-30'
                  "
                ></div>
                <span
                  class="text-[11px] uppercase tracking-[0.2em] transition-all duration-300"
                  :class="[
                    activeDoc === doc
                      ? 'text-gray-900 font-medium pl-4'
                      : 'text-gray-400 hover:text-gray-700 hover:pl-4 pl-2',
                  ]"
                >
                  {{ doc }}
                </span>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div class="p-4 border-t border-gray-100 bg-white/50 backdrop-blur-sm">
        <div
          class="flex items-center justify-between gap-3 px-2 py-2 rounded-xl border border-transparent hover:border-gray-100 hover:bg-white transition-all group"
        >
          <div class="flex items-center gap-3 overflow-hidden">
            <div
              class="w-9 h-9 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 border border-indigo-100"
            >
              <span class="font-bold text-indigo-400 uppercase">
                {{ fullName?.charAt(0) || "?" }}
              </span>
            </div>
            <div class="flex flex-col overflow-hidden">
              <span class="text-sm font-semibold text-gray-800 truncate">
                {{ fullName || "Loading..." }}
              </span>
              <span class="text-xs text-gray-400 tracking-tighter truncate">
                {{ profile?.email || "Authenticating" }}
              </span>
            </div>
          </div>

          <button
            @click="handleSignOut"
            class="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-50 hover:text-red-500 text-gray-400 rounded-lg transition-all"
            title="Sign Out"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-3.5 h-3.5"
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

    <main class="flex-1 flex flex-col min-w-0 bg-white">
      <header
        class="h-16 border-b border-gray-50 flex items-center justify-between px-8 bg-white/50 backdrop-blur-sm sticky top-0 z-20"
      >
        <div class="text-[10px] uppercase tracking-[0.3em] text-gray-300">
          Workspace / {{ activeDoc }}
        </div>
        <button
          @click="isContextOpen = !isContextOpen"
          class="text-[10px] uppercase tracking-widest px-4 py-2 border border-gray-100 rounded-full hover:bg-gray-50 transition-all"
        >
          {{ isContextOpen ? "Close Notes" : "Open Field Notes" }}
        </button>
      </header>

      <div class="flex-1 overflow-y-auto">
        <article class="max-w-3xl mx-auto px-12 py-20 animate-fade-in" :key="activeDoc">
          <h1 class="text-4xl font-extralight tracking-tight text-gray-900 mb-12">
            {{ activeDoc }}
          </h1>
          <div class="space-y-8 text-gray-600 leading-relaxed font-light text-lg">
            <p>Your thoughts begin here. No distractions, no robots, just your voice.</p>
          </div>
        </article>
      </div>
    </main>

    <aside
      class="border-l border-gray-100 bg-[#FAFAFA] transition-all duration-500 ease-in-out flex flex-col h-screen sticky top-0 shrink-0"
      :class="isContextOpen ? 'w-80 opacity-100' : 'w-0 opacity-0 pointer-events-none'"
    >
      <div class="p-8 min-w-[20rem] flex flex-col h-full overflow-y-auto">
        <div class="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
          <h3 class="text-[10px] uppercase tracking-[0.25em] font-bold text-gray-900">
            Field Notes
          </h3>
        </div>
      </div>
    </aside>
  </div>
</template>
