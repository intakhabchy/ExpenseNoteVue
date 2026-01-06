<template>
  <div class="d-flex flex-column vh-100">
    <Header />

    <div class="d-flex flex-grow-1">
      <Sidebar />

      <div class="flex-grow-1 p-4">
        <h3>Add Category</h3>

        <form @submit.prevent="saveCategory" class="mt-3">
            <div class="row">
                <div class="col-md-6 col-lg-4">
                    <!-- Category Name -->
                    <div class="mb-3">
                    <label class="form-label">Category Name</label>
                    <input
                        type="text"
                        class="form-control"
                        v-model="name"
                        required
                    />
                    </div>

                    <!-- Category Type -->
                    <div class="mb-3">
                    <label class="form-label">Category Type</label>
                    <select class="form-select" v-model="category_type_id" required>
                        <option value="">Select type</option>
                        <option v-for="type in categoryTypes" :key="type.id" :value="type.id">
                            {{ type.category_type_name }}
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
const type = ref("");
const categoryTypes = ref([]);
const category_type_id = ref([]);

const fetchCategoryTypes = async () => {
  const res = await api.get("/categorytypes");
  categoryTypes.value = res.data;
};

onMounted(() => {
  fetchCategoryTypes();
});

const saveCategory = async () => {
  try {
    await api.post("/categories", {
      category_name: name.value,
      category_type_id: type.value,
    });

    router.push("/categories"); // go back to list
  } catch (e) {
    console.error("Failed to save category", e);
  }
};

const goBack = () => {
  router.push("/categories");
};

</script>