<template>
  <nav id="nav" class="navbar">
    <div class="container container-nav">
      <div class="navbar-title">
        <div>Perfect Squad</div>
        <a @click="open = !open" class="toggle-button">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </a>
      </div>
      <ul class="navbar-links" :class="{ navToggle: open }">
        <router-link tag="li" to="/"><a>Players</a></router-link>
        <router-link tag="li" to="/favorites"><a>Favorites</a></router-link>
        <div>
          <Dropdown
            name="formations"
            :title="'Formation'"
            :options="options"
            @input="selected($event)"
          />
        </div>
      </ul>
    </div>
  </nav>
</template>

<script>
import Dropdown from "@/components/Dropdown.vue";
import { closeOnClickOutside } from "@/mixin.js";

export default {
  mixins: [closeOnClickOutside],
  data: () => ({
    open: false
  }),
  components: {
    Dropdown
  },
  methods: {
    selected(formationType) {
      this.$store.dispatch("changeFormation", formationType);
      localStorage.setItem("formationType", formationType);

      /* if (this.$route.path !== "/favorites") {
        this.$router.push("/favorites");
      } */
    }
  },
  computed: {
    options() {
      return Object.keys(this.$store.getters.formations);
    }
  }
};
</script>
