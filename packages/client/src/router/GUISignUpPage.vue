<script setup lang="ts">
import GUIAuthLayout from "@/component/GUIAuthLayout.vue";
import GUIButton from "@/component/GUIButton.vue";
import GUIInput from "@/component/GUIInput.vue";
import GUILogo from "@/component/GUILogo.vue";
import { ref, reactive } from "vue";

const isLoading = ref(false);
const form = reactive({
  name: "",
  displayName: "",
  email: "",
  password: "",
});

const handleSignUp = async () => {
  isLoading.value = true;
  setTimeout(() => (isLoading.value = false), 2000);
};
</script>

<template>
  <GUIAuthLayout label="Begin your collection of thoughts">
    <form @submit.prevent="handleSignUp" class="space-y-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <GUIInput
          label="Full Name"
          id="name"
          placeholder="Illiam Lee"
          v-model="form.name"
          required
        />
        <GUIInput
          label="Username"
          id="display-name"
          placeholder="illiamlee"
          v-model="form.displayName"
          required
        />
      </div>
      <GUIInput
        type="email"
        label="Email Address"
        id="email"
        v-model="form.email"
        placeholder="illiam@illima.io"
        required
      />
      <div>
        <GUIInput type="password" label="Password" id="password" v-model="form.password" required />
        <p class="mt-2 text-[11px] text-gray-400 font-light ml-1">
          Must be at least 8 characters long.
        </p>
      </div>
      <p class="text-[12px] text-gray-400 text-center px-4 leading-relaxed">
        By signing up, you agree to our
        <RouterLink
          to="/terms-of-service"
          class="underline decoration-gray-200 hover:decoration-indigo-400 transition-colors text-gray-500"
        >
          Terms of Service </RouterLink
        >.
      </p>
      <GUIButton :loading="isLoading" loading-label="Creating Account" type="submit">
        Join Illima
      </GUIButton>
    </form>
    <template #footer>
      <p class="mt-8 text-center text-sm text-gray-400 font-light">
        Already have an account?
        <RouterLink
          to="/auth/sign-in"
          class="font-medium text-gray-600 hover:text-black underline underline-offset-4 transition-all"
        >
          Sign in here!
        </RouterLink>
      </p>
    </template>
  </GUIAuthLayout>
</template>
