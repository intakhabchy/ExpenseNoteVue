<template>
  <div class="d-flex flex-column vh-100">
    <Header />

    <div class="d-flex flex-grow-1">
      <Sidebar />

      <div class="flex-grow-1 p-3">
        <div class="row align-items-stretch">

          <!-- LEFT: History (scrollable, same height as right) -->
          <div class="col-md-7">
            <div class="h-100 border rounded p-3 overflow-auto">
              <HistoryList />
            </div>
          </div>

          <!-- RIGHT: Entry Form (standard height) -->
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
