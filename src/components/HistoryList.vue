<template>
  <h5 class="mb-3">History</h5>

  <table class="table table-sm">
    <thead>
      <tr>
        <th>Date</th>
        <th>Category</th>
        <th>Debit</th>
        <th>Credit</th>
        <th>Balance</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="c in costs" :key="c.id">
        <td>{{ formatDate(c.created_at) }}</td>
        <td>{{ c.category.category_name }}</td>
        <td>{{ c.debit }}</td>
        <td>{{ c.credit }}</td>
        <td>{{ c.balance }}</td>
      </tr>
    </tbody>
  </table>

  <p v-if="costs.length === 0">No records found</p>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../api";

const costs = ref([]);

onMounted(async () => {
  const res = await api.get("/costByUser");
  costs.value = res.data;
});

const formatDate = (d) =>
  new Date(d).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
</script>
