<script setup lang="ts">
import GUILogo from "@/component/GUILogo.vue";
</script>

<template>
  <div
    class="min-h-screen bg-[#FDFDFD] text-gray-900 selection:bg-indigo-50 selection:text-indigo-600"
  >
    <nav class="max-w-5xl mx-auto px-8 py-12 flex justify-between items-center">
      <RouterLink to="/" class="transition-opacity hover:opacity-70">
        <GUILogo />
      </RouterLink>
      <RouterLink
        to="/auth/sign-up"
        class="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 hover:text-black transition-colors"
      >
        Enter the Sanctuary
      </RouterLink>
    </nav>
    <main class="max-w-3xl mx-auto px-8 pt-10 pb-32">
      <header class="mb-24">
        <h1 class="text-5xl font-extralight tracking-tight leading-tight mb-8">
          The luxury of <span class="italic font-serif text-gray-400">less.</span>
        </h1>
        <p class="text-xl text-gray-500 font-light leading-relaxed">
          In an era of digital noise, Illima is a quiet room. We didn't build a second brain; we
          built a place for your first one to breathe.
        </p>
      </header>
      <div class="space-y-20">
        <section class="group">
          <h2
            class="text-[10px] uppercase tracking-[0.4em] font-bold text-indigo-500 mb-6 transition-all group-hover:tracking-[0.5em]"
          >
            01. No Databases. Just Documents.
          </h2>
          <p class="text-lg text-gray-600 font-light leading-relaxed">
            Notion taught us to be project managers. Illima invites you to be a writer again. There
            are no relational databases to configure, no complex properties to tag, and no infinite
            nesting. Just your words, organized with the simplicity of a physical library.
          </p>
        </section>

        <section class="group">
          <h2
            class="text-[10px] uppercase tracking-[0.4em] font-bold text-indigo-500 mb-6 transition-all group-hover:tracking-[0.5em]"
          >
            02. Human Intelligence Only.
          </h2>
          <p class="text-lg text-gray-600 font-light leading-relaxed">
            We believe the "magic" happens in the struggle of the draft. Unlike Kortex or other
            modern workspaces, Illima contains
            <span class="font-medium text-gray-900">no AI.</span> No autocomplete, no summarization,
            and no generative distractions. Your insights are 100% yours.
          </p>
        </section>

        <section class="group">
          <h2
            class="text-[10px] uppercase tracking-[0.4em] font-bold text-indigo-500 mb-6 transition-all group-hover:tracking-[0.5em]"
          >
            03. Designed for the Archivist.
          </h2>
          <p class="text-lg text-gray-600 font-light leading-relaxed">
            Illima was born from a love for history and the scholars who documented it. We’ve traded
            the "move fast and break things" aesthetic for the "write slow and remember things"
            philosophy.
          </p>
        </section>
      </div>

      <footer class="mt-32 pt-16 border-t border-gray-100 text-center">
        <div class="mb-8">
          <p class="text-gray-400 font-light italic mb-2">Ready to clear the desk?</p>
          <div class="h-12 w-[1px] bg-gray-200 mx-auto"></div>
        </div>
        <RouterLink
          to="/auth/sign-up"
          class="inline-block px-12 py-4 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-black hover:-trangray-y-1 transition-all shadow-sm"
        >
          Create your Sanctuary
        </RouterLink>
      </footer>
    </main>
  </div>
</template>
