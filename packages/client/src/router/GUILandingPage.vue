<script setup lang="ts">
import GUILogo from "@/component/GUILogo.vue";
import { Archive, BookOpen, Lock } from "lucide-vue-next";
</script>

<template>
  <div
    class="min-h-screen transition-colors duration-500 bg-[#FDFDFD] text-gray-900 dark:bg-[#0A0A0A] dark:text-gray-100 selection:bg-indigo-100 dark:selection:bg-indigo-900/30"
  >
    <nav class="flex items-center justify-between px-8 py-8 max-w-7xl mx-auto">
      <GUILogo />
      <div class="space-x-8 flex items-center">
        <RouterLink
          to="/auth/sign-in"
          class="text-[11px] uppercase tracking-[0.2em] font-medium text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
        >
          Sign In
        </RouterLink>
        <RouterLink
          to="/auth/sign-up"
          class="text-[11px] uppercase tracking-[0.2em] px-6 py-3 font-semibold transition-all rounded-full bg-gray-900 text-white hover:bg-black dark:bg-white dark:text-black dark:hover:bg-gray-200"
        >
          Get Started
        </RouterLink>
      </div>
    </nav>
    <header class="max-w-4xl mx-auto text-center pt-24 pb-32 px-6">
      <h1
        class="text-5xl md:text-7xl font-extralight tracking-tight leading-tight mb-8 antialiased"
      >
        A home for your
        <span class="italic font-serif text-gray-400 dark:text-gray-600">deepest</span>
        thoughts.
      </h1>

      <p
        class="text-xl font-normal leading-relaxed mb-12 max-w-2xl mx-auto text-gray-500 dark:text-gray-400 antialiased"
      >
        Illima is a minimalist sanctuary for writers, students, and thinkers.
      </p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <RouterLink
          to="/auth/sign-up"
          class="w-full sm:w-auto px-10 py-4 text-sm font-bold rounded-xl transition-all hover:-translate-y-0.5 shadow-lg bg-gray-900 text-white dark:bg-white dark:text-black"
        >
          Start Writing for Free
        </RouterLink>
      </div>
    </header>
    <section
      id="features"
      class="py-32 border-y transition-colors duration-500 bg-[#FAFAFA] border-gray-100 dark:bg-[#0F0F0F] dark:border-white/5"
    >
      <div class="max-w-6xl mx-auto px-8">
        <div class="grid md:grid-cols-3 gap-16">
          <div class="space-y-6 group">
            <div
              class="w-12 h-12 flex items-center justify-center rounded-2xl border transition-all bg-white border-gray-100 text-indigo-500 shadow-sm dark:bg-white/5 dark:border-white/10 dark:text-indigo-400 group-hover:scale-110"
            >
              <BookOpen :size="20" />
            </div>
            <h3 class="text-lg font-medium tracking-tight text-gray-900 dark:text-white">
              Focus-First Editor
            </h3>
            <p class="font-light leading-relaxed text-gray-500 dark:text-gray-400">
              No distractions. No unnecessary toolbars. Just you and your words on a clean digital
              canvas.
            </p>
          </div>
          <div class="space-y-6 group">
            <div
              class="w-12 h-12 flex items-center justify-center rounded-2xl border transition-all bg-white border-gray-100 text-indigo-500 shadow-sm dark:bg-white/5 dark:border-white/10 dark:text-indigo-400 group-hover:scale-110"
            >
              <Archive :size="20" />
            </div>
            <h3 class="text-lg font-medium tracking-tight text-gray-900 dark:text-white">
              Organized Archives
            </h3>
            <p class="font-light leading-relaxed text-gray-500 dark:text-gray-400">
              Easily categorize your research into collections. Perfect for complex historical
              timelines.
            </p>
          </div>
          <div class="space-y-6 group">
            <div
              class="w-12 h-12 flex items-center justify-center rounded-2xl border transition-all bg-white border-gray-100 text-indigo-500 shadow-sm dark:bg-white/5 dark:border-white/10 dark:text-indigo-400 group-hover:scale-110"
            >
              <Lock :size="20" />
            </div>
            <h3 class="text-lg font-medium tracking-tight text-gray-900 dark:text-white">
              Private by Design
            </h3>
            <p class="font-light leading-relaxed text-gray-500 dark:text-gray-400">
              Your data is yours. Encrypted and accessible only by you, keeping your insights
              secure.
            </p>
          </div>
        </div>
      </div>
    </section>
    <footer class="py-20 px-8 max-w-7xl mx-auto border-t border-gray-50 dark:border-white/5">
      <div
        class="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left"
      >
        <div class="text-sm font-light text-gray-400 dark:text-gray-600">
          © 2026 Illima. Crafted for the curious mind.
        </div>
        <div
          class="flex gap-8 text-[10px] uppercase tracking-widest font-bold text-gray-400 dark:text-gray-600"
        >
          <a href="#" class="hover:text-black dark:hover:text-white transition-colors">Privacy</a>
          <RouterLink
            to="/terms-of-service"
            class="hover:text-black dark:hover:text-white transition-colors"
            >Terms Of Service</RouterLink
          >
          <a href="#" class="hover:text-black dark:hover:text-white transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  </div>
</template>
