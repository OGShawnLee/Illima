import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: () => import("@/router/GUILandingPage.vue") },
    { path: "/home/:id?", component: () => import("@/router/GUIHomePage.vue") },
    { path: "/auth/sign-in", component: () => import("@/router/GUISignInPage.vue") },
    { path: "/auth/sign-up", component: () => import("@/router/GUISignUpPage.vue") },
    { path: "/terms-of-service", component: () => import("@/router/GUITermsOfService.vue") },
  ],
});

export default router;
