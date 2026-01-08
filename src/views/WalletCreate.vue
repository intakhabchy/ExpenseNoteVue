<template>
  <div class="d-flex flex-column vh-100">
    <Header />

    <div class="d-flex flex-grow-1">
      <Sidebar />

      <div class="flex-grow-1 p-4">
        <h3>Add Wallet</h3>

        <form @submit.prevent="saveWallet" class="mt-3">
            <div class="row">
                <div class="col-md-6 col-lg-4">
                    <!-- Wallet Name -->
                    <div class="mb-3">
                        <label class="form-label">Wallet Name</label>
                        <input type="text" class="form-control" v-model="name" required />
                    </div>

                    <!-- Currency Type -->
                    <div class="mb-3">
                        <label class="form-label">Currency</label>
                        <select class="form-select" v-model="currency_id" required>
                            <option value="">Select type</option>
                            <option v-for="cr_list in currencyList" :key="cr_list.id" :value="cr_list.id">
                                {{ cr_list.currency_name }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>

            <button type="submit" class="btn btn-primary">Save</button>

            <button type="button" class="btn btn-secondary ms-2" @click="goBack">Cancel</button>
        </form>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import api from "../api";

import Header from "../components/Header.vue";
import Sidebar from "../components/Sidebar.vue";
import Footer from "../components/Footer.vue";

const router = useRouter();
const name = ref("");
const cr_list = ref("");
const currencyList = ref([]);
const currency_id = ref([]);

const fetchCurrencies = async () => {
  const res = await api.get("/currencies");
  currencyList.value = res.data;
};

onMounted(() => {
  fetchCurrencies();
});

const saveWallet = async () => {
  try {
    await api.post("/wallets", {
      wallet_name: name.value,
      currency_id: currency_id.value,
    });

    router.push("/wallets"); // go back to list
  } catch (e) {
    console.error("Failed to save category", e);
  }
};

const goBack = () => {
  router.push("/wallets");
};

</script>