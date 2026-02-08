<script setup lang="ts">
import GUILogo from "@/component/GUILogo.vue";
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-[#FDFDFD] dark:bg-[#0A0A0A] py-20 px-6 transition-colors duration-500 antialiased"
  >
    <div class="max-w-xl w-full text-center">
      <div class="flex justify-center mb-16">
        <GUILogo :large="true" />
      </div>
      <h2
        class="text-[10px] uppercase tracking-[0.4em] font-bold text-indigo-500 dark:text-indigo-400 mb-4"
      >
        Legal Framework
      </h2>
      <h1
        class="text-3xl md:text-4xl font-extralight tracking-tight text-gray-900 dark:text-white mb-12"
      >
        Terms of Service
      </h1>
      <div
        class="space-y-10 text-sm md:text-base font-light leading-relaxed text-gray-500 dark:text-gray-400"
      >
        <section>
          <h2
            class="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-900 dark:text-gray-100 mb-3"
          >
            01. Ownership
          </h2>
          <p>
            You retain 100% ownership of your thoughts. Illima is a minimalist vessel for your
            prose; we claim no rights to the intellectual property you create within our canvas.
          </p>
        </section>

        <section>
          <h2
            class="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-900 dark:text-gray-100 mb-3"
          >
            02. Liability
          </h2>
          <p>
            As a boutique side project, Illima is provided "as-is." While we strive for perfection,
            we cannot be held liable for any data loss or service interruptions.
          </p>
        </section>
        <section>
          <h2
            class="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-900 dark:text-gray-100 mb-3"
          >
            03. Privacy
          </h2>
          <p>
            We do not sell your data. Your research and writing are private by design, encrypted and
            accessible only to you.
          </p>
        </section>
      </div>
      <footer class="mt-20 pt-10 border-t border-gray-100 dark:border-white/5">
        <RouterLink
          to="/"
          class="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 hover:text-black dark:hover:text-white transition-all underline underline-offset-8 decoration-gray-200 dark:decoration-gray-800"
        >
          Return to Landing Page
        </RouterLink>
      </footer>
    </div>
  </div>
</template>
