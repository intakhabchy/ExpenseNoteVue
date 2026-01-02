<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <h4 class="text-center mb-3">Login</h4>

            <input
              type="email"
              class="form-control mb-3"
              placeholder="Email"
              v-model="email"
            />

            <input
              type="password"
              class="form-control mb-3"
              placeholder="Password"
              v-model="password"
            />

            <button class="btn btn-primary w-100" @click="login">
              Login
            </button>

            <p class="text-danger text-center mt-2" v-if="error">
              {{ error }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import api from "../api";

const email = ref("");
const password = ref("");
const error = ref("");

const login = async () => {
  try {
    const res = await api.post("/api-token-login", {
      email: email.value,
      password: password.value,
    });

    localStorage.setItem("token", res.data.token);
    window.location.href = "/dashboard";
  } catch (e) {
    error.value = "Invalid credentials";
  }
};
</script>
