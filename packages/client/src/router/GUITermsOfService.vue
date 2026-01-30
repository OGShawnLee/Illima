<script setup lang="ts">
import GUILogo from "@/component/GUILogo.vue";

const sections = [
  { id: "acceptance", title: "Acceptance of Terms" },
  { id: "privacy", title: "Data & Privacy" },
  { id: "content", title: "User Content" },
  { id: "conduct", title: "Acceptable Use" },
  { id: "termination", title: "Termination" },
];

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};
</script>

<template>
  <div class="min-h-screen bg-[#FDFDFD]">
    <header class="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <RouterLink to="/" class="hover:opacity-70 transition-opacity">
          <GUILogo />
        </RouterLink>
        <RouterLink
          to="/auth/sign-up"
          class="text-[10px] uppercase tracking-widest font-bold text-indigo-600"
        >
          Back to Registration
        </RouterLink>
      </div>
    </header>
    <div class="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-16">
      <aside class="hidden lg:block lg:col-span-3 sticky top-32 h-fit">
        <nav>
          <p class="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-6">
            On this page
          </p>
          <ul class="space-y-4">
            <li v-for="section in sections" :key="section.id">
              <button
                @click="scrollTo(section.id)"
                class="text-sm text-gray-500 hover:text-indigo-600 transition-colors text-left"
              >
                {{ section.title }}
              </button>
            </li>
          </ul>
        </nav>
      </aside>
      <main class="lg:col-span-9 max-w-2xl">
        <header class="mb-16">
          <h1 class="text-4xl font-extralight tracking-tight text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p class="text-sm text-gray-400 font-light italic">Last Updated: January 27, 2026</p>
        </header>
        <div
          class="prose prose-gray prose-headings:font-light prose-headings:tracking-tight space-y-12"
        >
          <section id="acceptance">
            <h2 class="text-2xl text-gray-800 mb-4">1. Acceptance of Terms</h2>
            <p class="text-gray-600 leading-relaxed font-light">
              By accessing or using Illima, you agree to be bound by these Terms of Service. If you
              do not agree to all of these terms, do not use our services. We reserve the right to
              modify these terms at any time, and your continued use of the platform signifies
              acceptance of those changes.
            </p>
          </section>
          <section id="privacy">
            <h2 class="text-2xl text-gray-800 mb-4">2. Data & Privacy</h2>
            <p class="text-gray-600 leading-relaxed font-light">
              Your privacy is paramount. Illima is built on the principle of minimal data
              collection. We do not sell your personal information or the contents of your documents
              to third parties. Please review our Privacy Policy for details on how we encrypt and
              protect your "Digital Sanctuary."
            </p>
          </section>
          <section id="content">
            <h2 class="text-2xl text-gray-800 mb-4">3. User Content</h2>
            <p class="text-gray-600 leading-relaxed font-light">
              You retain full ownership of any text, images, or data you upload to Illima. By using
              the service, you grant us a limited license to host and backup your content solely for
              the purpose of providing the service to you.
            </p>
            <blockquote class="border-l-2 border-indigo-100 pl-4 italic text-gray-500 font-light">
              "Your thoughts remain yours. We are merely the stewards of the ink."
            </blockquote>
          </section>
          <section id="conduct">
            <h2 class="text-2xl text-gray-800 mb-4">4. Acceptable Use</h2>
            <p class="text-gray-600 leading-relaxed font-light">
              You agree not to use Illima for any illegal purposes or to upload content that
              infringes upon the intellectual property rights of others. Harassment, spamming, or
              attempting to compromise the security of our servers is strictly prohibited.
            </p>
          </section>
        </div>
        <footer class="mt-20 pt-10 border-t border-gray-100 text-center lg:text-left">
          <p class="text-gray-400 text-sm font-light mb-6">Have questions about these terms?</p>
          <a
            href="mailto:support@illima.io"
            class="inline-block px-8 py-3 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-black transition-all"
          >
            Contact Legal Team
          </a>
        </footer>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* Smooth scrolling for the whole page */
html {
  scroll-behavior: smooth;
}

/* Maintain light touch for body text */
p {
  font-size: 1.05rem;
}
</style>
