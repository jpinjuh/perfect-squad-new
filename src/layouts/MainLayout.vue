<template>
  <div class="main">
    <Navbar />
    <div class="content-layout container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
export default {
  name: "MainLayout",
  components: {
    Navbar
  }
};
</script>
