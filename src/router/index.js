import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login.vue";
import Dashboard from "@/views/Dashboard.vue";

const routes = [
  { path: "/", component: Login },
  { path: "/dashboard", component: Dashboard, meta: { requiresAuth: true }},
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// 👉 PUT IT HERE
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (to.meta.requiresAuth && !token) {
    next("/");
  } else {
    next();
  }
});

export default router;