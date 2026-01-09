<template>
  <div class="d-flex flex-column vh-100">
    <Header />

    <div class="d-flex flex-grow-1">
      <Sidebar />

      <div class="flex-grow-1 p-3">
        <div class="flex-grow-1 p-3 d-flex gap-3">
          <!-- LEFT -->
          <div class="col-md-7 d-flex flex-column">
            <div class="border rounded p-3 overflow-auto flex-grow-1">
              <HistoryList />
            </div>
          </div>

          <!-- RIGHT -->
          <div class="col-md-5">
            <div class="border rounded p-3">
              <WalletForm />
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import Header from "../components/Header.vue";
import Sidebar from "../components/Sidebar.vue";
import Footer from "../components/Footer.vue";
import HistoryList from "../components/HistoryList.vue";
import WalletForm from "../components/WalletForm.vue";
</script>
