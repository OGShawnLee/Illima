<script setup lang="ts">
import GUIAuthLayout from "@/component/GUIAuthLayout.vue";
import GUIButton from "@/component/GUIButton.vue";
import GUIInput from "@/component/GUIInput.vue";
import router from "@/router";
import { AccountSchema, useAwait } from "shared";
import { ref, reactive } from "vue";

const isLoading = ref(false);
const form = reactive<AccountSchema.SignUpShape>({
  name: "",
  last_name: "",
  display_name: "",
  email: "",
  password: "",
});

async function handleSignUp() {
  isLoading.value = true;

  const { error } = await useAwait(async () => {
    const response = await fetch("http://localhost:3000/auth/sign-up", {
      method: "POST",
      body: JSON.stringify(AccountSchema.getValidSignUpShape(form)),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok && response.status === 201) {
      router.push("/auth/sign-in");
    }
  });

  if (error) {
    console.error(error);
  }

  isLoading.value = false;
}
</script>

<template>
  <GUIAuthLayout label="Begin your collection of thoughts">
    <form @submit.prevent="handleSignUp" class="space-y-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <GUIInput label="Name" id="name" placeholder="Illiam" v-model="form.name" required />
        <GUIInput
          label="Last Name"
          id="last-name"
          placeholder="Lee"
          v-model="form.last_name"
          required
        />
      </div>
      <GUIInput
        label="Username"
        id="display-name"
        placeholder="illiamlee"
        v-model="form.display_name"
        required
      />
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
