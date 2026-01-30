<script setup lang="ts">
import { ref } from "vue";
import GUILogo from "@/component/GUILogo.vue";

const isContextOpen = ref(false);
const activeDoc = ref("The Modern Thesis");

// Collection management state
const collections = ref([
  {
    name: "Academic Work",
    documents: [
      "The Modern Thesis",
      "Lecture Notes: Ethics",
      "Research Summary",
      "The Modern Thesis",
      "Lecture Notes: Ethics",
      "Research Summary",
      "The Modern Thesis",
      "Lecture Notes: Ethics",
      "Research Summary",
      "The Modern Thesis",
      "Lecture Notes: Ethics",
      "Research Summary",
      "The Modern Thesis",
      "Lecture Notes: Ethics",
      "Research Summary",
      "The Modern Thesis",
      "Lecture Notes: Ethics",
      "Research Summary",
      "The Modern Thesis",
      "Lecture Notes: Ethics",
      "Research Summary",
    ],
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
            <button @click="handleAddCollection" class="text-gray-400 hover:text-black text-xs">
              +
            </button>
          </div>

          <div v-for="collection in collections" :key="collection.name" class="mb-8">
            <div class="flex items-center justify-between mb-3 px-2 group">
              <span class="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">{{
                collection.name
              }}</span>
              <button
                @click="handleAddDoc(collection.name)"
                class="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-indigo-500"
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

      <div class="p-8 border-t border-gray-100">
        <RouterLink
          to="/auth/sign-in"
          class="text-[10px] uppercase tracking-widest text-gray-400 hover:text-red-400"
          >Sign Out</RouterLink
        >
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

        <section class="mb-10">
          <h4 class="text-[9px] uppercase tracking-widest text-gray-400 mb-4 font-bold">
            Related Documents
          </h4>
          <div class="space-y-3">
            <div
              class="p-3 bg-white border border-gray-100 rounded-lg group cursor-pointer hover:border-indigo-200 transition-colors"
            >
              <p class="text-[11px] text-gray-600 font-medium">Bibliography.pdf</p>
              <p class="text-[9px] text-gray-400 mt-1">Uploaded Oct 12</p>
            </div>
            <div
              class="p-3 border border-dashed border-gray-200 rounded-lg text-center hover:bg-white cursor-pointer transition-colors"
            >
              <span class="text-[9px] uppercase tracking-widest text-gray-400">+ Add Resource</span>
            </div>
          </div>
        </section>

        <section class="mb-10">
          <h4 class="text-[9px] uppercase tracking-widest text-gray-400 mb-4 font-bold">
            Project Goals
          </h4>
          <ul class="space-y-2 text-[11px] text-gray-500 font-light">
            <li class="flex items-center gap-2">
              <div class="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
              Complete Draft v1
            </li>
            <li class="flex items-center gap-2">
              <div class="w-1.5 h-1.5 rounded-full border border-gray-300"></div>
              Verify Citations
            </li>
          </ul>
        </section>
      </div>
    </aside>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.custom-scrollbar::-webkit-scrollbar {
  width: 3px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #eee;
  border-radius: 10px;
}
</style>
