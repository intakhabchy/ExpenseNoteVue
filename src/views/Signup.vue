<template>
  <div class="vh-100 d-flex justify-content-center align-items-center bg-light">
    <div class="card shadow-sm" style="width: 380px;">
      <div class="card-body p-4">
        <h4 class="text-center mb-4">Sign Up</h4>

        <div class="mb-3">
          <label class="form-label">Name</label>
          <input
            type="text"
            class="form-control"
            v-model="name"
            placeholder="Enter your name"
          />
        </div>

        <div class="mb-3">
          <label class="form-label">Email</label>
          <input
            type="email"
            class="form-control"
            v-model="email"
            placeholder="Enter your email"
          />
        </div>

        <div class="mb-3">
          <label class="form-label">Password</label>
          <input
            type="password"
            class="form-control"
            v-model="password"
            placeholder="Enter your password"
          />
        </div>

        <button class="btn btn-primary w-100" @click="signup">
          Sign Up
        </button>

        <!-- Back to login link -->
        <div class="text-center mt-3">
          <small>
            Already have an account? 
            <a href="#" @click.prevent="goLogin">Login</a>
          </small>
        </div>

        <div v-if="error" class="text-danger text-center mt-3">
          {{ error }}
        </div>

        <div v-if="success" class="text-success text-center mt-3">
          {{ success }}
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

const name = ref("");
const email = ref("");
const password = ref("");
const error = ref("");
const success = ref("");

const signup = async () => {
  error.value = "";
  success.value = "";

  if (!name.value || !email.value || !password.value) {
    error.value = "All fields are required";
    return;
  }

  try {
    const res = await api.post("/user_registration", {
      name: name.value,
      email: email.value,
      password: password.value,
    });

    success.value = "Registration successful! Redirecting to login...";
    setTimeout(() => {
      router.push("/login");
    }, 1500);
  } catch (e) {
    error.value = e.response?.data?.message || "Registration failed";
  }
};

const goLogin = () => {
  router.push("/login");
};
</script>
