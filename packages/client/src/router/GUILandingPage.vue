<template>
  <div
    class="min-h-screen bg-[#FDFDFD] text-gray-900 selection:bg-indigo-50 selection:text-indigo-600"
  >
    <nav class="flex items-center justify-between px-8 py-8 max-w-7xl mx-auto">
      <div class="uppercase text-2xl font-extralight tracking-[0.4em]">Illima</div>
      <div class="space-x-8 flex items-center">
        <RouterLink
          to="/auth/sign-in"
          class="text-xs uppercase tracking-widest text-gray-500 hover:text-black transition-colors"
        >
          Sign In
        </RouterLink>
        <RouterLink
          to="/auth/sign-up"
          class="text-xs uppercase tracking-widest px-5 py-2.5 bg-gray-900 text-white rounded-full hover:bg-black transition-all"
        >
          Get Started
        </RouterLink>
      </div>
    </nav>
    <header class="max-w-4xl mx-auto text-center pt-24 pb-32 px-6">
      <h1 class="text-5xl md:text-7xl font-extralight tracking-tight leading-tight mb-8">
        A home for your <span class="italic font-serif text-gray-400">deepest</span> thoughts.
      </h1>
      <p class="text-xl text-gray-500 font-light leading-relaxed mb-12 max-w-2xl mx-auto">
        Illima is a minimalist sanctuary for writers, students, and thinkers. A quiet space to
        transform your research into prose without the digital noise.
      </p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <RouterLink
          to="/auth/sign-up"
          class="w-full sm:w-auto px-10 py-4 bg-gray-900 text-white rounded-xl text-sm font-medium hover:shadow-xl transition-all hover:-trangray-y-0.5"
        >
          Start Writing for Free
        </RouterLink>
        <a
          href="#features"
          class="w-full sm:w-auto px-10 py-4 border border-gray-100 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
        >
          Explore Features
        </a>
      </div>
    </header>
    <section id="features" class="bg-[#FAFAFA] py-32 border-y border-gray-100">
      <div class="max-w-6xl mx-auto px-8">
        <div class="grid md:grid-cols-3 gap-12">
          <div class="space-y-4">
            <div
              class="w-10 h-10 bg-white shadow-sm border border-gray-100 rounded-lg flex items-center justify-center text-indigo-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 tracking-tight">Focus-First Editor</h3>
            <p class="text-gray-500 font-light leading-relaxed">
              No distractions. No unnecessary toolbars. Just you and your words on a clean digital
              canvas.
            </p>
          </div>
          <div class="space-y-4">
            <div
              class="w-10 h-10 bg-white shadow-sm border border-gray-100 rounded-lg flex items-center justify-center text-indigo-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 tracking-tight">Organized Archives</h3>
            <p class="text-gray-500 font-light leading-relaxed">
              Easily categorize your research into collections. Perfect for complex historical
              timelines.
            </p>
          </div>

          <div class="space-y-4">
            <div
              class="w-10 h-10 bg-white shadow-sm border border-gray-100 rounded-lg flex items-center justify-center text-indigo-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 tracking-tight">Private by Design</h3>
            <p class="text-gray-500 font-light leading-relaxed">
              Your data is yours. Encrypted and accessible only by you, keeping your insights
              secure.
            </p>
          </div>
        </div>
      </div>
    </section>
    <footer class="py-20 px-8 max-w-7xl mx-auto border-t border-gray-50">
      <div
        class="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left"
      >
        <div class="text-sm font-light text-gray-400">
          © 2026 Illima. Crafted for the curious mind.
        </div>
        <div class="flex gap-8 text-[10px] uppercase tracking-widest text-gray-400 font-bold">
          <a href="#" class="hover:text-black">Privacy</a>
          <RouterLink to="/terms-of-service"> Terms </RouterLink>
          <a href="#" class="hover:text-black">Contact</a>
        </div>
      </div>
    </footer>
  </div>
</template>
