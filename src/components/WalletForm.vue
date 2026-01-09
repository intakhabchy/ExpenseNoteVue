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

  <p v-if="success" class="text-success">{{ success }}</p>
  <p class="text-danger mt-2" v-if="error">{{ error }}</p>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../api";

// reactive lists
const wallets = ref([]);
const categories = ref([]);
const costs = ref([]); // history list
const error = ref("");
const success = ref("");

// form
const form = ref({
  wallet_id: "",
  category_id: "",
  amount: "",
});

// load dropdown and history data
const loadData = async () => {
  try {
    wallets.value = (await api.get("/walletByUser")).data;
    categories.value = (await api.get("/categories")).data;
  } catch (e) {
    console.error("Failed to load data:", e);
  }
};

onMounted(loadData);

// save entry
const saveEntry = async () => {
  error.value = "";

  // simple frontend validation
  if (!form.value.wallet_id || !form.value.category_id || !form.value.amount) {
    error.value = "Please fill all fields";
    return;
  }

  try {
    const res = await api.post("/costs", form.value);

    // Axios always returns 'status' for HTTP status code
    if (res && res.status === 201) {
      success.value = "Entry saved successfully!";
    }

    // reset amount only
    form.value.amount = "";

  } catch (e) {
    // show backend error message if exists
    error.value = e.response?.data?.message || "Failed to save";
  }
};
</script>