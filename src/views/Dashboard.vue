<template>
  <div class="d-flex flex-column vh-100">
    <Header />

    <div class="d-flex flex-grow-1">
      <Sidebar />
      <div class="flex-grow-1 p-4">
        <h3>Welcome to Expense Tracker</h3>
        <p>This is your dashboard body.</p>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import Header from "../components/Header.vue";
import Sidebar from "../components/Sidebar.vue";
import Footer from "../components/Footer.vue";
</script>
