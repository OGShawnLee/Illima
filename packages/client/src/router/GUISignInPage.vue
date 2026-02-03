<script setup>
import GUIAuthLayout from "@/component/GUIAuthLayout.vue";
import GUIButton from "@/component/GUIButton.vue";
import GUIInput from "@/component/GUIInput.vue";
import router from "@/router";
import { AccountSchema, useAwait } from "shared";
import { ref, reactive } from "vue";
import { AUTH_TOKEN_NAME } from "@/env";

const isLoading = ref(false);
const form = reactive({
  display_name: "",
  password: "",
});

async function handleSignIn() {
  isLoading.value = true;

  const { error } = await useAwait(async () => {
    const response = await fetch("http://localhost:3000/auth/sign-in", {
      method: "POST",
      body: JSON.stringify(AccountSchema.getValidSignInShape(form)),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const token = await response.text();

    if (token) {
      localStorage.setItem(AUTH_TOKEN_NAME, token);
      router.push("/home");
    }
  });

  if (error) {
    console.error(error);
  }

  isLoading.value = false;
}
</script>

<template>
  <GUIAuthLayout label="Where thoughts find their home">
    <form @submit.prevent="handleSignIn" class="space-y-7">
      <GUIInput
        type="text"
        label="Username"
        id="display-name"
        v-model="form.display_name"
        placeholder="IlliamLee"
        required
      />
      <GUIInput type="password" label="Password" id="password" v-model="form.password" required />
      <GUIButton :loading="isLoading" loading-label="Authenticating..." type="submit">
        Enter Illima
      </GUIButton>
    </form>
    <div class="mt-8">
      <div class="relative">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-100"></div>
        </div>
        <div class="relative flex justify-center text-xs uppercase tracking-widest">
          <span class="px-4 bg-white text-gray-300 font-light">Or continue with</span>
        </div>
      </div>
      <div class="mt-6">
        <button
          class="w-full flex justify-center items-center py-3 px-4 border border-gray-100 rounded-xl bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            class="w-4 h-4 mr-2"
            alt="Google"
          />
          Google
        </button>
      </div>
    </div>
    <template #footer>
      <p class="mt-8 text-center text-sm text-gray-400 font-light">
        Don't have an account?
        <RouterLink
          to="/auth/sign-up"
          class="font-medium text-gray-600 hover:text-black underline underline-offset-4 transition-all"
        >
          Sign up here!
        </RouterLink>
      </p>
    </template>
  </GUIAuthLayout>
</template>
