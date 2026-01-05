<template>
  <div class="d-flex flex-column vh-100">
    <!-- Header stays on top -->
    <Header />

    <div class="d-flex flex-grow-1">
      <!-- Sidebar on the left -->
      <Sidebar />

      <!-- Main content area -->
      <div class="flex-grow-1 p-4">
        <h3>Categories</h3>

        <!-- Table to show category data -->
        <table class="table table-bordered mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>User</th>
              <th>Currency</th>
              <th>Created By</th>
              <th>Created At</th>
            </tr>
          </thead>

          <!-- Loop through categories from backend -->
          <tbody>
            <tr v-for="wallet in wallets" :key="wallet.id">
              <td>{{ wallet.id }}</td>
              <td>{{ wallet.wallet_name }}</td>
              <td>{{ wallet.user.name }}</td>
              <td>{{ wallet.currency.currency_name }}</td>
              <td>{{ wallet.user.name }}</td>
              <td>{{ formatDate(wallet.created_at) }}</td>
            </tr>
          </tbody>
        </table>

        <!-- Message if no categories exist -->
        <p v-if="wallets.length === 0">No wallets found.</p>
      </div>
    </div>

    <!-- Footer stays at bottom -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"; // ref → reactive variable, onMounted → run code when component loads
import api from "../api"; // axios instance with baseURL and token

// Import layout components
import Header from "../components/Header.vue";
import Sidebar from "../components/Sidebar.vue";
import Footer from "../components/Footer.vue";

// Reactive variable to store wallets
const wallets = ref([]);

// Function to fetch wallets from backend API
const fetchWallets = async () => {
  try {
    const res = await api.get("/wallets"); // Call Laravel API
    wallets.value = res.data; // Save response in reactive variable
  } catch (e) {
    console.error("Failed to fetch wallets:", e); // Show error in console
  }
};

// Run fetchWallets when the component is mounted
onMounted(() => {
  fetchWallets();
});

const formatDate = (dateStr) => {

  if(dateStr === null) return '';

  const date = new Date(dateStr);

  // "en-US" for December 31, 2025 5:00 PM format
  // "en-GB" for 27 December 2025 at 10:18 pm format
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};
</script>

<style scoped>
/* Optional styling for table */
.table th, .table td {
  text-align: left;
}
</style>