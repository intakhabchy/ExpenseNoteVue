<template>
  <h5 class="mb-3">New Entry</h5>

  <!-- Wallet -->
  <div class="mb-2">
    <label class="form-label">Wallet</label>
    <select class="form-select" v-model="form.wallet_id">
      <option value="">Select wallet</option>
      <option v-for="w in wallets" :key="w.id" :value="w.id">
        {{ w.wallet_name }}
      </option>
    </select>
  </div>

  <!-- Category -->
  <div class="mb-2">
    <label class="form-label">Category</label>
    <select class="form-select" v-model="form.category_id">
      <option value="">Select category</option>
      <option v-for="c in categories" :key="c.id" :value="c.id">
        {{ c.category_name }}
      </option>
    </select>
  </div>

  <!-- Amount -->
  <div class="mb-2">
    <label class="form-label">Amount</label>
    <input type="number" class="form-control" v-model="form.amount" />
  </div>

  <button class="btn btn-primary w-100" @click="saveEntry">
    Save
  </button>

  <p class="text-danger mt-2" v-if="error">{{ error }}</p>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../api";

const wallets = ref([]);
const categories = ref([]);
const error = ref("");

const form = ref({
  wallet_id: "",
  category_id: "",
  amount: "",
});

// load dropdown data
onMounted(async () => {
  wallets.value = (await api.get("/walletByUser")).data;
  categories.value = (await api.get("/categories")).data;
});

// save entry
const saveEntry = async () => {
  error.value = "";

  try {
    await api.post("/costs", form.value);
    form.value.amount = "";
    window.location.reload(); // simple refresh
  } catch (e) {
    error.value = "Failed to save";
  }
};
</script>
