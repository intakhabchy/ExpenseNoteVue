<template>
  <div class="vh-100 d-flex justify-content-center align-items-center bg-light">
    <div class="card shadow-sm" style="width: 380px;">
      <div class="card-body p-4">
        <h4 class="text-center mb-4">Expense Note</h4>

        <div class="mb-3">
          <label class="form-label">Email</label>
          <input
            type="email"
            class="form-control"
            v-model="email"
            placeholder="Enter email"
          />
        </div>

        <div class="mb-3">
          <label class="form-label">Password</label>
          <input
            type="password"
            class="form-control"
            v-model="password"
            placeholder="Enter password"
          />
        </div>

        <button class="btn btn-primary w-100" @click="login">
          Login
        </button>

        <div v-if="error" class="text-danger text-center mt-3">
          {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import api from "../api";
import { useRouter } from "vue-router";

const router = useRouter();

const email = ref("");
const password = ref("");
const error = ref("");

const login = async () => {
  error.value = "";
  try {
    const res = await api.post("/api-token-login", {
      email: email.value,
      password: password.value,
    });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("userName", res.data.user.name);
    router.push("/dashboard");  // no page reload; windows.location.href = "/dashboard" reloads
  } catch {
    error.value = "Invalid email or password";
  }
};
</script>
