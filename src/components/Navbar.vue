<template>
  <nav id="nav" class="navbar">
    <div class="container container-nav">
      <div class="navbar-title">
        <div>Perfect Squad</div>
        <a @click="dropdownToggle = !dropdownToggle" class="toggle-button">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </a>
      </div>
      <ul class="navbar-links" :class="{ navToggle: dropdownToggle }">
        <router-link tag="li" to="/"><a @click="closePopup()">Players</a></router-link>
        <router-link tag="li" to="/favorites"><a @click="closePopup()">Favorites</a></router-link>
        <div>
          <CustomSelect
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
import CustomSelect from "@/components/CustomSelect.vue";
import { formationTypes } from "@/utils/pitchPositions.js";
export default {
  data: () => ({
    dropdownToggle: false,
    options: formationTypes
  }),
  components: {
    CustomSelect
  },
  methods: {
    selected(formationType) {
      this.$store.dispatch("changeFormation", formationType);
      localStorage.setItem("formationType", formationType);

      if (this.$route.path !== "/favorites") {
        this.$router.push("/favorites");
      }

      this.closePopup();
    },
    closePopup() {
      this.$store.dispatch("notFavoriteSelected");
    }
  }
};
</script>
