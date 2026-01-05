import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login.vue";
import Dashboard from "@/views/Dashboard.vue";
import Categories from "@/views/Categories.vue";

const routes = [
  { path: "/", component: Login },
  { path: "/dashboard", component: Dashboard, meta: { requiresAuth: true }},
  { path: "/categories", component: Categories, meta: { requiresAuth: true }},
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Executes before each route change
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  // already logged in → redirect from login to dashboard
  if (to.path === "/" && token) {
    next("/dashboard");
    return;
  }

  // protected route → no token → back to login
  if (to.meta.requiresAuth && !token) {
    next("/");
    return;
  }

  next();
});

export default router;