<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-3">
    <a class="navbar-brand" href="#">Expense Tracker</a>

    <div class="ms-auto dropdown">
      <button
        class="btn btn-outline-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
      >
        {{ userName }}
      </button>
      <ul class="dropdown-menu dropdown-menu-end">
        <li><a class="dropdown-item" href="#">Profile</a></li>
        <li><hr class="dropdown-divider" /></li>
        <li><a class="dropdown-item" @click="logout">Logout</a></li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";

const userName = ref(localStorage.getItem("userName") || "User");

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userName");
  window.location.href = "/";
};
</script>

<style scoped>
/* optional small padding */
</style>
