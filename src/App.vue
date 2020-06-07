<template>
  <div id="app">
    <MainLayout />
  </div>
</template>

<script>
import MainLayout from "@/views/MainLayout.vue";
export default {
  name: "App",
  components: {
    MainLayout
  },
  data: () => ({
    //
  }),
  created() {
    this.$store.dispatch("fetchData");
  }
};
</script>

<style lang="scss"></style>
