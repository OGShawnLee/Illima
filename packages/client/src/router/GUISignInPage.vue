<script setup>
import GUIAuthLayout from "@/component/GUIAuthLayout.vue";
import GUIButton from "@/component/GUIButton.vue";
import GUIInput from "@/component/GUIInput.vue";
import router from "@/router";
import { AccountSchema, useAwait } from "shared";
import { ref, reactive } from "vue";
import { AUTH_TOKEN_NAME } from "@/env";
import api from "@/api";

const isLoading = ref(false);
const form = reactive({
  display_name: "",
  password: "",
});

async function handleSignIn() {
  isLoading.value = true;

  const { data, error } = await api.auth["sign-in"].post(form);

  if (data) {
    localStorage.setItem(AUTH_TOKEN_NAME, data);
    router.push("/studio");
  } else if (error) {
    switch (error.status) {
      case 500:
        alert("An unexpected error has happened!");
        break;
      case 422:
        alert("Invalid Data");
        break;
      case 400:
        alert("Invalid Credentials");
        break;
      default:
        alert("An unexpected error has happened!" + error);
    }
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
        placeholder="illiamLee"
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
          <div class="w-full border-t border-gray-100 dark:border-white/5"></div>
        </div>
        <div class="relative flex justify-center text-[10px] uppercase tracking-[0.2em]">
          <span
            class="px-4 bg-white dark:bg-[#111111] text-gray-400 dark:text-gray-600 font-bold transition-colors"
          >
            Or continue with
          </span>
        </div>
      </div>
      <div class="mt-6">
        <button
          class="w-full flex justify-center items-center py-3 px-4 border rounded-xl text-sm font-medium transition-all bg-white border-gray-100 text-gray-500 hover:bg-gray-50 dark:bg-white/5 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/10"
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
      <p
        class="mt-8 text-center text-xs uppercase tracking-[0.15em] text-gray-400 dark:text-gray-600 font-medium"
      >
        Don't have an account?
        <RouterLink
          to="/auth/sign-up"
          class="ml-1 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white underline underline-offset-4 decoration-gray-200 dark:decoration-gray-800 transition-all"
        >
          Sign up here
        </RouterLink>
      </p>
    </template>
  </GUIAuthLayout>
</template>
