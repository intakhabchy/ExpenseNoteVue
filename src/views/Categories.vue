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
              <th>Type</th>
              <th>Created By</th>
              <th>Created At</th>
            </tr>
          </thead>

          <!-- Loop through categories from backend -->
          <tbody>
            <tr v-for="category in categories" :key="category.id">
              <td>{{ category.id }}</td>
              <td>{{ category.category_name }}</td>
              <td>{{ category.type.category_type_name }}</td>
              <td>{{ category.user.name }}</td>
              <td>{{ formatDate(category.created_at) }}</td>
            </tr>
          </tbody>
        </table>

        <!-- Message if no categories exist -->
        <p v-if="categories.length === 0">No categories found.</p>
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

// Reactive variable to store categories
const categories = ref([]);

// Function to fetch categories from backend API
const fetchCategories = async () => {
  try {
    const res = await api.get("/categories"); // Call Laravel API
    categories.value = res.data; // Save response in reactive variable
  } catch (e) {
    console.error("Failed to fetch categories:", e); // Show error in console
  }
};

// Run fetchCategories when the component is mounted
onMounted(() => {
  fetchCategories();
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