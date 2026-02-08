import { AUTH_TOKEN_NAME } from "@/env";
import { isNullish } from "shared";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: () => import("@/router/GUILandingPage.vue") },
    { path: "/studio/:id?", component: () => import("@/router/GUIStudioPage.vue") },
    { path: "/auth/sign-in", component: () => import("@/router/GUISignInPage.vue") },
    { path: "/auth/sign-up", component: () => import("@/router/GUISignUpPage.vue") },
    { path: "/terms-of-service", component: () => import("@/router/GUITermsOfService.vue") },
  ],
});

router.beforeEach((to, from) => {
  const auth = localStorage.getItem(AUTH_TOKEN_NAME);

  if ((to.path === "/auth/sign-in" || to.path === "/auth/sign-up") && auth) {
    return "/studio";
  }

  if (to.path === "/studio" && isNullish(auth)) {
    return "/auth/sign-in";
  }
});

export default router;
